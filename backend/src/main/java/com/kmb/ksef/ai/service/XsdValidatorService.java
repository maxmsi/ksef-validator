package com.kmb.ksef.ai.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Service
public class XsdValidatorService {

    private final Validator validator;

    public XsdValidatorService() throws IOException, SAXException {
        SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
        ClassPathResource xsdResource = new ClassPathResource("schemas/ksef-minimal.xsd");
        try (InputStream xsdStream = xsdResource.getInputStream()) {
            Schema schema = factory.newSchema(new StreamSource(xsdStream));
            this.validator = schema.newValidator();
        }
    }

    public void validate(String xmlContent) throws SAXException, IOException {
        validator.validate(new StreamSource(new ByteArrayInputStream(xmlContent.getBytes(StandardCharsets.UTF_8))));
    }
}
