package demo.usercart.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo.usercart.model.*;
import java.util.*;
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins="*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepo;
	@Autowired
	JwtUtility JwtUtil;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order, @RequestHeader("Authorization") String token) {
        String username = JwtUtil.extractUsername(token.replace("Bearer ", ""));
        if (username == null)
               return ResponseEntity.status(401).build();
        order.setOrderTime(LocalDateTime.now());
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }

       // return ResponseEntity.ok(orderRepo.save(order));
        Order rs=orderRepo.save(order);
        for (OrderItem item : order.getItems()) {
            item.setOrder(null);
        }
        return ResponseEntity.ok(rs);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable String username) {
    	List<Order> data=orderRepo.findByUsername(username);
    	data.forEach(o->o.setItems(null));
        return ResponseEntity.ok(data);
    }
    
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
    	List<Order> orders=orderRepo.findAll();
    	orders.replaceAll(o->{
    		o.setItems(null);
    		return o;
    	});
        return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/orderid/{orderid}")
    public ResponseEntity<Order> getOrdersById(@PathVariable("orderid") long orderid) {
    	Order order=orderRepo.findById(orderid).orElse(null);
    	if(order!=null)
    	  order.setItems(null);
        return ResponseEntity.ok(order);
    }
    
    @DeleteMapping("/orderid/{orderid}")
    public ResponseEntity<?> deleteOrderById(@PathVariable("orderid") long orderid, @RequestHeader("Authorization") String token) {
    	String username = JwtUtil.extractUsername(token.replace("Bearer ", ""));
        if (username == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Optional<Order> optionalOrder = orderRepo.findById(orderid);
        if (!optionalOrder.isPresent()) {
            return ResponseEntity.status(404).body("訂單不存在");
        }

        Order order = optionalOrder.get();

        // 驗證是否為該使用者的訂單
        if (!order.getUsername().equals(username)) {
            return ResponseEntity.status(403).body("無權限刪除此訂單");
        }

        // 先刪除 OrderItem (可省略，若你有設定 cascade)
        orderRepo.delete(order); // 若設有 CascadeType.ALL，則 OrderItem 會自動刪除

        return ResponseEntity.ok("訂單刪除成功");
    }
}

