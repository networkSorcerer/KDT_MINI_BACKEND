package com.kh.MINI.admin3.dao3;

import com.kh.MINI.admin3.vo3.ProductsVO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class ProductsDAO3 {
    private final JdbcTemplate jdbcTemplate;
    private static final String ALL_PRODUCTS = "SELECT * FROM PRODUCTS";

    public List<ProductsVO3> getAllProducts() {
        try {
            return jdbcTemplate.query(ALL_PRODUCTS, new ProductsRowMapper() {
            });
        } catch (DataAccessException e) {
            log.error("상품 출력 중 예외 발생",e);
            throw e;
        }
    }
    private static class ProductsRowMapper implements RowMapper<ProductsVO3> {
        @Override
        public ProductsVO3 mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new ProductsVO3(
                    rs.getInt("product_id"),
                    rs.getString("name"),
                    rs.getString("description"),
                    rs.getInt("price"),
                    rs.getInt("stock"),
                    rs.getString("image_url"),
                    rs.getInt("category_id")
            );
        }
    }

}
