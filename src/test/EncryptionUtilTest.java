package test;

import com.example.demo.config.EncryptionUtil;
import org.junit.jupiter.api.Test;

class EncryptionUtilTest {

    @Test
    void testEncryptAndDecrypt() throws Exception {
        // given
        String encrypted;
        String decrypted = EncryptionUtil.decrypt("G2dZZFkcDcrcXKSgf/FhkQ==" );

        // then
        System.out.println("Decrypted: " + decrypted);
    }
}
