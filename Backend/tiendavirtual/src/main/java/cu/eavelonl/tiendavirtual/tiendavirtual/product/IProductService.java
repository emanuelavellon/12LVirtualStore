package cu.eavelonl.tiendavirtual.tiendavirtual.product;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IProductService {
    Product saveProduct(Product product);
    List<Product> findAllProduct();
    Product updateProduct(Product product);
    Product findProductByCode(String code);
    void deleteProduct(Product product);
}
