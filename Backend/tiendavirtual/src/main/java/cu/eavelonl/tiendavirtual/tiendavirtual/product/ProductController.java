package cu.eavelonl.tiendavirtual.tiendavirtual.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(maxAge = 3600)
@RequestMapping("api/v1/product")
public class ProductController {
    private final IProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@RequestBody Product productRequest) throws Exception {
        MaterialResponse materialResponse = new MaterialResponse();
        DigitalResponse digitalResponse = new DigitalResponse();
        Product product = productService.saveProduct(productRequest);

        if(productRequest.getProductType().name().equals(ProductType.MATERIAL.toString())){
            if (productRequest.getTax() < 0){
                throw new Exception("This type of product should have a valid tax major than 0");
            }

            materialResponse.setId(product.getId());
            materialResponse.setCode(product.getCode());
            materialResponse.setName(product.getName());
            materialResponse.setProductType(product.getProductType());
            materialResponse.setTax(product.getTax());

            return ResponseEntity.status(HttpStatus.CREATED).body(materialResponse);
        }
        if(productRequest.getProductType().name().equals(ProductType.DIGITAL.toString())){
            if (productRequest.getDownloadLink().isBlank()){
                throw new Exception("This type of product should have a URL");
            }

            digitalResponse.setName(product.getName());
            digitalResponse.setCode(product.getCode());
            digitalResponse.setDownloadLink(product.getDownloadLink());
            return ResponseEntity.status(HttpStatus.CREATED).body(digitalResponse);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PutMapping(
            value = "/{code}"
    )
    public ResponseEntity<Product> updateProduct(
            @PathVariable String code,
            @RequestBody Product productRequest
    ) {
        Optional<Product> product = Optional.ofNullable(productService.findProductByCode(code));
        if (product.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        Product foundProduct = product.get();
        foundProduct.setName(productRequest.getName());
        foundProduct.setProductType(productRequest.getProductType());

        String productType = productRequest.getProductType().name();

        if(productType.equals(ProductType.MATERIAL.toString())){
            foundProduct.setTax(productRequest.getTax());

            if(productRequest.getDownloadLink()!=null && productRequest.getDownloadLink().isEmpty()){
                foundProduct.setDownloadLink(productRequest.getDownloadLink());
            }
        }else if(productType.equals(ProductType.DIGITAL.toString())){
            foundProduct.setDownloadLink(productRequest.getDownloadLink());

            if(productRequest.getTax() == 0){
                foundProduct.setTax(productRequest.getTax());
            }
        }

        Product productReturned = productService.updateProduct(foundProduct);

        return ResponseEntity.ok(productReturned);
    }

    @GetMapping
    public ResponseEntity<List<Product>> findAllProducts(
    ) {
        List<Product> materials = productService.findAllProduct();
        return ResponseEntity.ok(materials);
    }

    @DeleteMapping(
            value = "/{code}"
    )
    public ResponseEntity<Product> deleteProduct(
            @PathVariable String code
    ) {
        Optional<Product> material = Optional.ofNullable(productService.findProductByCode(code));

        if (material.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        productService.deleteProduct(material.get());

        return ResponseEntity.ok().build();
    }
}
