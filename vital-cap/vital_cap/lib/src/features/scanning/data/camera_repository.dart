import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class CameraRepository {
  // TODO: send request to backend & handle response
  Future<void> requestImageContext(Image image) {
    try {
      // TODO: call sendImage()
      // Future.delayed(const Duration(seconds: 2));
      contextProvider = sendImage(image);
      //TODO: handle error
    } catch (error, stack) {
      throw (error);
    }
  }

  Future<Text> sendImage(Image image) {
    // TODO: Dio, http to send request to backend
    final response =
        http.post(Uri.parse('http://localhost:8080/extract-text'), image);
    //TODO: handle response
    if (response.hasError) {
      throw Exception('Error: ${response.error}');
    }
    if (response.hasData) {
      return response.data;
    }
    return response.data;
  }
}
