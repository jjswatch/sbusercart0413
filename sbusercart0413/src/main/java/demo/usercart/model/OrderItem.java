package demo.usercart.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_items")
@Data
public class OrderItem {
    @Id   
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int pid;
    private String productTitle;
    private int productPrice;
    private int quantity;
    
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    // getters, setters
}

