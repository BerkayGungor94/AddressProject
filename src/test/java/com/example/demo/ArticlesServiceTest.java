package com.example.demo;

import com.example.demo.dto.ArticlesDTO;
import com.example.demo.dto.ArticlesResponse;
import com.example.demo.entity.ArticlesEntity;
import com.example.demo.factory.FactoryAddressDTO;
import com.example.demo.repository.ArticlesEntityRepository;
import com.example.demo.service.AddressService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ArticlesServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private ArticlesEntityRepository articlesEntityRepository;

    @InjectMocks
    private AddressService articlesService; // fetchAndSaveArticles buradaysa

    @Test
    void testFetchAndSaveArticles_Success() {
        // 1. Hazırlık
        String url = "http://fake-url";
        ArticlesDTO dto = new ArticlesDTO();
        dto.setTitle("Test Title");

        ArticlesResponse mockResponse = new ArticlesResponse();
        mockResponse.setData(List.of(dto));

        // restTemplate mock
        when(restTemplate.getForObject(url, ArticlesResponse.class))
                .thenReturn(mockResponse);

        // FactoryAddressDTO.convertArticlesToEntity mock
        ArticlesEntity entity = new ArticlesEntity();
        entity.setTitle("Test Title");

        try (MockedStatic<FactoryAddressDTO> mockedStatic = Mockito.mockStatic(FactoryAddressDTO.class)) {
            mockedStatic.when(() -> FactoryAddressDTO.convertArticlesToEntity(dto))
                    .thenReturn(entity);

            // 2. Metodu çağır
            List<ArticlesDTO> result = articlesService.fetchAndSaveArticles();

            // 3. Doğrulamalar
            assertNotNull(result);
            assertEquals(1, result.size());
            assertEquals("Test Title", result.get(0).getTitle());

            verify(articlesEntityRepository, times(1)).saveAll(List.of(entity));
        }
    }
}
