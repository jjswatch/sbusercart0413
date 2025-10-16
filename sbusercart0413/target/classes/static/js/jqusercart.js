
let isLoggedIn = false;
let cart = [];
let myproducts = [];
// 分頁相關變數
let currentPage = 1;
const pageSize = 8; // 每頁顯示幾個產品

function submitOrder() {
	if (!isLoggedIn) {
		alert("請先登入！");
		return;
	}

	const username = $('#username').val();
	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	console.log('total:' + total);
	const order = {
		username: username,
		totalPrice: total,
		items: cart.map(p => ({
			pid: p.id,
			productTitle: p.title,
			productPrice: p.price,
			quantity: p.quantity
		}))
	};
	console.log("orders list :" + JSON.stringify(order));

	$.ajax({
		url: "http://localhost:8080/api/orders",
		type: "POST",
		contentType: "application/json",
		headers: {
			"Authorization": "Bearer " + localStorage.getItem("token")
		},
		data: JSON.stringify(order),
		success: function(data) {
			alert("訂單已送出！");
			cart = [];
			updateCart();
		}
	});
}

function updateCart() {
	$('#cartItems').empty();
	let total = 0;

	if (cart.length === 0) {
		$('#cartItems').append('<li class="list-group-item">購物車是空的</li>');
	} else {
		cart.forEach((item, index) => {
			total += item.price * item.quantity;
			$('#cartItems').append(`
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${item.title} - ${item.price} 元 ,數量: ${item.quantity}
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">刪除</button>
          </li>
        `);
		});
	}
	$('#totalPrice').text(total);
}

function removeFromCart(index) {
	if (confirm("確定要將此商品從購物車中移除嗎？")) {
		cart.splice(index, 1); // 從購物車陣列中移除指定 index 的項目
		updateCart();
	}
}

function start() {
	isLoggedIn = false;

	// 檢查是否已登入（從 token 判斷）
	$.ajax({
		url: "http://localhost:8080/api/user/checkLogin",
		type: "GET",
		headers: {
			"Authorization": "Bearer " + localStorage.getItem("token")
		},
		success: function(isValid) {
			if (isValid === true) {
				isLoggedIn = true;
				const username = sessionStorage.getItem("username");
				$('#loginStatus').text(`歡迎，${username}`);
				$('#nav-login').hide(); // 隱藏登入選項
				$('#nav-logout').show(); // 顯示帳戶登出

				// 切換到產品列表畫面
				$('#content > div').removeClass('active');
				$('#products').addClass('active');
				loadProducts(); // 載入產品列表
			} else {
				isLoggedIn = false;
				$('#loginStatus').text('未登入');
				$('#nav-login').show();   // 顯示帳戶登入
				$('#nav-logout').hide();  // 隱藏帳戶登出

				// 切換到登入畫面
				$('#content > div').removeClass('active');
				$('#login').addClass('active');
			}
		},
		error: function() {
			isLoggedIn = false;
			$('#loginStatus').text('未登入');
			$('#nav-login').show();
			$('#nav-logout').hide();

			$('#content > div').removeClass('active');
			$('#login').addClass('active');
		}
	});

	$('#nav-logout').click(function(e) {
		e.preventDefault();
		logout();
	});

	$('.nav-link').click(function(e) {
		e.preventDefault();
		let target = $(this).data('target');
		console.log('切換到畫面：', target);
		$('#content > div').removeClass('active');
		$('#' + target).addClass('active');

		if (target === 'products') {
			console.log('呼叫 loadProducts()');
			loadProducts();
		}

		//if (target === 'products') loadProducts();
		if (target === 'cart') updateCart();
		if (target === 'orders') showOrders();
	});

	$('#loginBtn').click(function(e) {
		e.preventDefault();
		const user = $('#username').val();
		const pass = $('#password').val();

		$.ajax({
			url: "http://localhost:8080/api/user/login",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify({ username: user, password: pass }),
			success: function(res) {
				localStorage.setItem("token", res.token);
				console.log("encoded data :" + res.token);
				isLoggedIn = true;
				$('#loginMessage').text('');
				$('#loginStatus').text(`歡迎，${user}`);
				sessionStorage.setItem("username", `${user}`);
				$('#nav-login').hide(); // 登入成功後隱藏登入選項
				$('#nav-logout').show();   // 顯示登出選項
				alert("登入成功！");
				// 切換畫面到產品列表
				$('#content > div').removeClass('active'); // 隱藏所有內容區塊
				$('#products').addClass('active');         // 顯示產品區塊
				loadProducts();                            // 載入產品
			},
			error: function(xhr) {
				$('#loginMessage').text('帳號或密碼錯誤');
			}
		});

	});

	$('#backToList').click(function() {
		$('#content > div').removeClass('active');
		$('#products').addClass('active');
		renderProductPage();
		renderPagination();
	});

	function loadProducts() {
		console.log('開始載入產品...');
		$('#productList').empty();
		$.ajax({
			url: "http://localhost:8080/api/products",
			type: "GET",
			dataType: "json",
			success: function(products) {
				myproducts = products;
				/*
				$.each(products, function(i, product) {
					$('#productList').append(`
							   <div class="col-md-3">
								 <div class="card mb-3">
								  <div class="card-body">
									<h5 class="card-title">${product.title}</h5>
									<img src="${product.image}"  class="card-img-top" width="160" height="200"/>
									<p class="card-text">價格：${product.price} 元</p>
									<p class="card-text">購買數量：<input type="text" id=qty${i} value="1"></p>
						   <button class="btn btn-success" onclick="addToCart(${product.id},qty${i})">加入購物車</button>
								 </div>
								</div>
							  </div>
							`);
				});
				*/
				renderProductPage();      // 渲染當前頁面產品
				renderPagination();       // 渲染分頁按鈕
			},
			error: function(xhr) {
				$('#loginMessage').text('帳號或密碼錯誤');
			}
		});

	}
}

// 顯示當前頁面的產品
function renderProductPage() {
	$('#productList').empty();
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const productsToShow = myproducts.slice(startIndex, endIndex);

	/*
	$.each(productsToShow, function(i, product) {
		const index = startIndex + i;
		$('#productList').append(`
				<div class="col-md-3">
					<div class="card mb-3">
						<div class="card-body">
							<h5 class="card-title">${product.title}</h5>
							<img src="${product.image}" class="card-img-top" width="160" height="200"/>
							<p class="card-text">價格：${product.price} 元</p>
							<p class="card-text">購買數量：<input type="text" id="qty${index}" value="1"></p>
							<button class="btn btn-success" onclick="addToCart(${product.id}, qty${index})">加入購物車</button>
						</div>
					</div>
				</div>
			`);
	});
	*/
	$.each(productsToShow, function(i, product) {
		const index = startIndex + i;
		$('#productList').append(`
	            <div class="col-md-3">
	                <div class="card mb-3">
	                    <img src="${product.image}" class="card-img-top" width="160" height="200"/>
	                    <div class="card-body">
	                        <h5 class="card-title">${product.title}</h5>
	                        <p class="card-text">價格：${product.price} 元</p>
	                        <p class="card-text">購買數量：<input type="number" id="qty${index}" value="1" min="1" max="${product.stock}"></p>
	                        <button class="btn btn-success btn-sm mb-1" onclick="addToCart(${product.id}, qty${index})">加入購物車</button>
	                        <button class="btn btn-primary btn-sm" onclick="viewProductDetail(${product.id})">查看商品</button>
	                    </div>
	                </div>
	            </div>
	        `);
	});
}

// 分頁按鈕
function renderPagination() {
	$('#pagination').empty();
	const totalPages = Math.ceil(myproducts.length / pageSize);

	// 上一頁
	$('#pagination').append(`
	        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
	            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">上一頁</a>
	        </li>
	    `);

	// 頁碼
	for (let i = 1; i <= totalPages; i++) {
		$('#pagination').append(`
	            <li class="page-item ${currentPage === i ? 'active' : ''}">
	                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
	            </li>
	        `);
	}

	// 下一頁
	$('#pagination').append(`
	        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
	            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">下一頁</a>
	        </li>
	    `);
}

// 切換頁碼
function changePage(page) {
	const totalPages = Math.ceil(myproducts.length / pageSize);
	if (page < 1 || page > totalPages) return;
	currentPage = page;
	renderProductPage();
	renderPagination();
}

function viewProductDetail(productId) {
	$.ajax({
		url: `http://localhost:8080/api/products/${productId}`,
		type: "GET",
		dataType: "json",
		success: function(product) {
			// 切換畫面
			$('#content > div').removeClass('active');
			$('#productDetail').addClass('active');

			// 顯示商品資料
			$('#productDetailContent').html(`
                <div class="row">
                    <div class="col-md-5">
                        <img src="${product.image}" class="img-fluid" alt="${product.title}">
                    </div>
                    <div class="col-md-7">
                        <h4>${product.title}</h4>
                        <p><strong>價格：</strong> ${product.price} 元</p>
                        <p><strong>庫存：</strong> ${product.stock || '無'}</p>
                        <p><strong>描述：</strong> ${product.description || '暫無商品說明'}</p>
                        <div class="mb-2">
                            購買數量：
                            <input type="number" id="detailQty" value="1" min="1" max="${product.stock}" class="form-control w-25 d-inline">
                        </div>
                        <button class="btn btn-success" onclick="addToCart(${product.id}, '#detailQty')">加入購物車</button>
                    </div>
                </div>
            `);
		},
		error: function(xhr) {
			alert("無法取得商品資料，請稍後再試");
		}
	});
}


function showOrders() {
	if (sessionStorage.getItem("username") == null) {
		alert('user not login');
		return;
	}
	$('#orderList').empty();
	$('#itemList').empty();
	$('#orderList').append(`
        <div class="col-md-3">                            
            <p>訂單編號</p>                                                      
         </div>
         <div class="col-md-3">                            
            <p>訂單用戶</p>                                                      
         </div>
         <div class="col-md-3">                            
            <p>訂單時間</p>                                                      
         </div>
        <div class="col-md-3">                            
          <p>Action</p>
         </div>
    `);
	$.ajax({
		url: "http://localhost:8080/api/orders/" + sessionStorage.getItem("username"),
		type: "GET",
		dataType: "json",
		success: function(orders) {
			$.each(orders, function(i, order) {
				$('#orderList').append(`
                            <div class="col-md-3">                            
                                <p>${order.id}</p>                                                      
                             </div>
                             <div class="col-md-3">                            
                                <p>${order.username}</p>                                                      
                             </div>
                             <div class="col-md-3">                            
                                <p>${order.orderTime}</p>                                                      
                             </div>
                            <div class="col-md-3">                            
                              <button class="btn btn-success" onclick="showDetails(${order.id})">顯示訂購商品</button>
							  <button class="btn btn-danger" onclick="deleteOrder(${order.id})">刪除訂單</button>
                             </div>
                        `);
			});
		},
		error: function(xhr) {
			$('#loginMessage').text('帳號或密碼錯誤');
		}
	});

}

function showDetails(orderid) {
	$('#orderList').empty();
	$('#orderList').append(`
        <div class="col-md-4">                            
            <p>訂單編號</p>                                                      
         </div>
         <div class="col-md-4">                            
            <p>訂單用戶</p>                                                      
         </div>
         <div class="col-md-4">                            
            <p>訂單時間</p>                                                      
         </div>
        
    `);
	$.ajax({
		url: "http://localhost:8080/api/orders/orderid/" + orderid,
		type: "GET",
		dataType: "json",
		success: function(order) {

			$('#orderList').append(`
                            <div class="col-md-4">                            
                                <p>${order.id}</p>                                                      
                             </div>
                             <div class="col-md-4">                            
                                <p>${order.username}</p>                                                      
                             </div>
                             <div class="col-md-4">                            
                                <p>${order.orderTime}</p>                                                      
                             </div>
                            
                        `);

		},
		error: function(xhr) {
			$('#loginMessage').text('帳號或密碼錯誤');
		}
	});
	showItemDetails(orderid);
}

function deleteOrder(orderid) {
	if (!confirm("確定要刪除這筆訂單嗎？")) return;
	$.ajax({
		url: "http://localhost:8080/api/orders/orderid/" + orderid,
		type: "DELETE",
		headers: {
			"Authorization": "Bearer " + localStorage.getItem("token")
		},
		success: function() {
			alert("訂單已成功刪除！");
			showOrders(); // 重新載入訂單列表
		},
		error: function(xhr) {
			if (xhr.status === 403 || xhr.status === 401) {
				alert("權限不足或尚未登入！");
			} else {
				alert("刪除失敗：" + xhr.responseText);
			}
		}
	});
}

function showItemDetails(orderid) {
	$('#itemList').empty();
	/*
	$('#itemList').append(`
		<div class="col-md-3">                            
			<p>產品編號</p>                                                      
		 </div>
		 <div class="col-md-3">                            
			<p>產品名稱</p>                                                      
		 </div>
		 <div class="col-md-3">                            
			<p>產品價格</p>                                                      
		 </div>
		<div class="col-md-3">                            
		  <p>數量</p>
		 </div>
		 <div class="col-md-3">
			  <p>操作</p>
		</div>
	`);
	*/

	$('#itemList').append(`
	        <table class="table table-bordered table-striped">
	            <thead class="thead-dark">
	                <tr>
	                    <th>產品編號</th>
	                    <th>產品名稱</th>
	                    <th>產品價格</th>
	                    <th>數量</th>
	                    <th>操作</th>
	                </tr>
	            </thead>
	            <tbody id="itemTableBody">
	            </tbody>
	        </table>
	    `);

	$.ajax({
		url: "http://localhost:8080/api/items/" + orderid,
		type: "GET",
		dataType: "json",
		success: function(items) {
			$.each(items, function(i, item) {
				$('#itemTableBody').append(`
		                    <tr>
		                        <td>${item.pid}</td>
		                        <td style="white-space: normal;">${item.productTitle}</td>
		                        <td>${item.productPrice}</td>
		                        <td>${item.quantity}</td>
		                        <td>
		                            <button class="btn btn-danger btn-sm" onclick="deleteOrderItem(${orderid}, ${item.id})">刪除</button>
		                        </td>
		                    </tr>
		                `);
			});
		},
		error: function(xhr) {
			$('#loginMessage').text('取得訂購商品失敗');
		}
	});

}

function deleteOrderItem(orderid, orderItemId) {
	if (!confirm("確定要刪除此訂單商品嗎？")) return;

	$.ajax({
		url: `http://localhost:8080/api/items/remove/${orderItemId}`,  // 這個 API 路徑請依後端實作調整
		type: "DELETE",
		headers: {
			"Authorization": "Bearer " + localStorage.getItem("token")
		},
		success: function() {
			alert("商品已成功刪除！");
			showOrders(); // 改成回到訂單列表畫面
			//showItemDetails(orderid); // 重新載入商品列表
		},
		error: function(xhr) {
			if (xhr.status === 403 || xhr.status === 401) {
				alert("權限不足或尚未登入！");
			} else {
				alert("刪除失敗：" + xhr.responseText);
			}
		}
	});
}

function addToCart(productId, qty) {
	/*
	const product = myproducts.find(p => p.id === productId);
	console.log("qty:" + $(qty).val())
	const product2 = { ...product, "quantity": $(qty).val() }
	cart.push(product2);
	console.log("product:" + JSON.stringify(product2));
	alert(`已將 ${product2.title} 加入購物車`);
	*/

	const quantity = parseInt($(qty).val());
	//const quantity = $(qty).val();

	// 先從 myproducts 找
	let product = myproducts.find(p => p.id === productId);

	// 如果列表裡沒有，再打 API 拿
	if (!product) {
		$.ajax({
			url: `http://localhost:8080/api/products/${productId}`,
			type: "GET",
			dataType: "json",
			success: function(p) {
				const product2 = { ...p, quantity: quantity };
				cart.push(product2);
				alert(`已將 ${product2.title} 加入購物車`);
				updateCart();
			},
			error: function() {
				alert("加入購物車失敗，無法取得商品資訊");
			}
		});
	} else {
		if (quantity > product.stock) {
			alert(`庫存不足！目前最多只能購買 ${product.stock} 件`);
			return;
		}
		const product2 = { ...product, quantity: quantity };
		cart.push(product2);
		alert(`已將 ${product2.title} 加入購物車`);
		updateCart();
	}
}

function logout() {
	localStorage.removeItem("token");
	sessionStorage.removeItem("username");
	isLoggedIn = false;
	$('#loginStatus').text('未登入');
	$('#nav-login').show();
	$('#nav-logout').hide();
	$('#content > div').removeClass('active');
	$('#login').addClass('active');
}

$(document).ready(start);

