package com.masai.chatgpt.FormattedData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin("*")
public class ChatGptController {
	@Autowired
	private RestTemplate template;
	private String apiURL = "https://api.openai.com/v1/chat/completions";

	@PostMapping("/chat")
	public ResponseEntity<Message> chat(@RequestParam("prompt") String prompt) {
		ChatGPTRequest request = new ChatGPTRequest("gpt-3.5-turbo",prompt);
		
	  ChatGPTResponse chatgptResponse =template.postForObject(apiURL, request, ChatGPTResponse.class);
	  Message result = chatgptResponse.getChoices().get(0).getMessage();
	  return new ResponseEntity<>( result,HttpStatus.CREATED);
	}
}
