package com.masai.chatgpt;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

//@RestController
public class ChatGptController {

	@GetMapping("/chat")
	public String callApi() {
		String apiKey = "YOUR_API_KEY";
        String url = "https://api.openai.com/v1/engines/text-davinci-002/completions";
        String message = "who is prime minister of india";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);
        HttpEntity<String> requestEntity = new HttpEntity<>("{\"prompt\": \"" + message + "\", \"max_tokens\": 100}", headers);
        
        
        RestTemplate restTemplate = new RestTemplate();
        
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        String responseJson = responseEntity.getBody();
//        return responseEntity;

//        System.out.println(responseJson);
//        System.out.println(responseEntity);
        // Extract the response message from the JSON
        String answer = responseJson.split("\"choices\": \\[\\{\"text\": \"")[0].split("\"}]}")[0];
        System.out.println("ChatGPT Response: " + answer);
        return answer;
	}
}
