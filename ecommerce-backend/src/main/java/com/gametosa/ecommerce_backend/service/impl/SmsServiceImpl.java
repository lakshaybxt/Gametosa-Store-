package com.gametosa.ecommerce_backend.service.impl;

import com.gametosa.ecommerce_backend.configuration.TwilioConfiguration;
import com.gametosa.ecommerce_backend.service.SmsService;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SmsServiceImpl implements SmsService {

    private final TwilioConfiguration twilioConfig;

    @Override
    public void sendSms(String to, String message) {
        Message response = Message.creator(
                new PhoneNumber(to),
                new PhoneNumber(twilioConfig.getPhoneNumber()),
                message
        ).create();

        System.out.println("SMS sent to " + to + " with SID: " + response.getSid());
    }
}
