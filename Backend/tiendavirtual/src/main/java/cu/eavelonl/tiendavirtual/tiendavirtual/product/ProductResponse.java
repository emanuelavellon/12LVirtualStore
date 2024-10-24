package cu.eavelonl.tiendavirtual.tiendavirtual.product;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductResponse {
    private Long id;
    private String code;
    private String name;
    private ProductType productType;
}
