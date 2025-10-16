package demo.usercart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo.usercart.model.*;

import java.util.*;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class OrderItemController {
	@Autowired
	ItemRepository itemsRepo;

	@Autowired
	JwtUtility JwtUtil;
	
	@Autowired
	private OrderRepository orderRepo;

	@GetMapping("/{orderid}")
	public ResponseEntity<List<OrderItem>> getByOrderId(@PathVariable("orderid") long orderid) {
		List<OrderItem> items = itemsRepo.findByOrderId(orderid);
		for (OrderItem i : items) {
			i.setOrder(null);
		}
		return ResponseEntity.ok(items);
	}

	@DeleteMapping("/remove/{id}")
	public ResponseEntity<?> deleteOrderItemById(@PathVariable("id") long id, @RequestHeader("Authorization") String token) {
	    try {
	        String username = JwtUtil.extractUsername(token.replace("Bearer ", ""));
	        if (username == null) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("未登入");
	        }

	        Optional<OrderItem> optItem = itemsRepo.findById(id);
	        if (!optItem.isPresent()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("找不到此訂單商品");
	        }

	        OrderItem item = optItem.get();
	        Order order = item.getOrder();

	        // 驗證使用者身份
	        if (!order.getUsername().equals(username)) {
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("無權限刪除此訂單商品");
	        }

	        // 刪除該筆 OrderItem
	        itemsRepo.deleteById(id);

	        // 查詢剩餘的 OrderItems
	        List<OrderItem> remainingItems = itemsRepo.findByOrderId(order.getId());

	        if (remainingItems == null || remainingItems.isEmpty()) {
	            orderRepo.deleteById(order.getId()); // 沒有商品就刪掉整筆訂單
	            return ResponseEntity.ok("商品與訂單已刪除");
	        }

	        // 重新計算 totalPrice 並更新訂單
	        Integer newTotal = remainingItems.stream()
	                .mapToInt(i -> i.getProductPrice() * i.getQuantity())
	                .sum();

	        order.setTotalPrice(newTotal);
	        orderRepo.save(order);

	        return ResponseEntity.ok("商品已刪除，訂單總價已更新");

	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("刪除失敗：" + e.getMessage());
	    }
	}
}
