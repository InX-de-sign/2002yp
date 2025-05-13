/*
 * Simple Encoder Resolution Test
 * Counts pulses per revolution (PPR) of a quadrature encoder
 * Connect Encoder Channel A to pin 2 (interrupt pin)
 */

// const int encoderPin = 2;  // Encoder Channel A (must be an interrupt-capable pin)
// volatile unsigned long pulseCount = 0;
// unsigned long lastPrintTime = 0;

// // Interrupt Service Routine (ISR)
// void IRAM_ATTR countPulse() {
//   pulseCount++;
// }

// void setup() {
//   Serial.begin(115200);
//   pinMode(encoderPin, INPUT_PULLUP);
  
//   // Attach interrupt to encoder pin (RISING edge detection)
//   attachInterrupt(digitalPinToInterrupt(encoderPin), countPulse, RISING);
  
//   Serial.println("Encoder Resolution Test");
//   Serial.println("----------------------");
//   Serial.println("Rotate the wheel SLOWLY by hand for one full revolution.");
//   Serial.println("Observe the pulse count to determine PPR (Pulses Per Revolution).");
//   Serial.println();
// }

// void loop() {
//   unsigned long currentTime = millis();
  
//   // Print pulse count every 500ms
//   if (currentTime - lastPrintTime >= 500) {
//     Serial.print("Pulses: ");
//     Serial.println(pulseCount);
//     lastPrintTime = currentTime;
//   }
  
//   // Reset count after 5 seconds (for multiple tests)
//   if (currentTime > 5000) {
//     pulseCount = 0;
//     lastPrintTime = 0;
//     Serial.println("\nReset counter. Rotate wheel again to retest.");
//     delay(1000);  // Small delay to prevent immediate reset
//   }
// }