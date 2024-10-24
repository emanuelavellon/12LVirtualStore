package cu.eavelonl.tiendavirtual.tiendavirtual.product;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService implements IProductService {
    private ProductRepository productRepository;

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    public Product findProductByCode(String code) {
        try {
            return productRepository.findByCode(code)
                    .orElseThrow(() -> new Exception(
                            "Value not exist"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteProduct(Product product) {
        productRepository.delete(product);
    }

    public List<Product> findAllProduct()  {
        return productRepository.findAll();
    }
}
