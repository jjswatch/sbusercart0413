package demo.usercart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo.usercart.model.*;

import java.util.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

	@Autowired
	ProductRepository productDAO;

	@GetMapping
	public List<Product> getProducts() {
		List<Product> products = productDAO.findAll();
		return products;
	}

	@GetMapping("/{id}")
	public Product getProductById(@PathVariable int id) {
		
		Optional<Product> optionalProduct = productDAO.findById(id);
		if (optionalProduct.isPresent()) {
			return optionalProduct.get();
		} else {
			throw new RuntimeException("商品不存在，ID: " + id);
		}
		
		//return productDAO.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "找不到商品 ID: " + id));
	}
}
