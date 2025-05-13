// // Define maximum RFIDs per region
// #define MAX_RFIDS_PER_REGION 30
// #define MAX_REGIONS 16
// #include "rfidDetection.hpp"

// struct Region
// {
//   uint8_t id;
//   const char *name;
//   const char *rfids[MAX_RFIDS_PER_REGION];
//   uint8_t count;
// };

// // Example regions (adjust sizes as needed)
// Region regions[MAX_REGIONS] = {
//     {1, "Node1", {"40ce6791", "e0cd6691", "c0cd6791", "d0ce6791", "60ce6691", "a04e6891", "60d46791", "e0ce6691", "204f6891"}, 9},
//     {2, "Node2", {"404b6791", "10d26691", "a0406791", "a0436791", "90d16691", "30406791", "70456791", "10d16691", "b03f6791"}, 9},
//     {3, "Node3", {"4adb8bbc", "ba718dbc", "6adf8dbc", "cadb8bbc", "3a728dbc", "eadf8dbc", "3a738dbc", "ba728dbc", "6ae08dbc"}, 9},
//     {4, "Node4", {"904e6791", "404d6791", "204e6791", "e0466791", "b04b6791", "80506791", "a0486791", "304c6791"}, 8}, // only 2 tags from node4-3
//     {5, "Node5", {"fa938dbc", "7a948dbc", "aac48dbc", "7a938dbc", "aac58dbc", "2ac48dbc", "1a788dbc", "2ac58dbc", "9ae28bbc"}, 9},
//     {6, "Node6", {"1adc8dbc", "4ada8bbc", "cada8bbc"}, 3},                                                                                                  // parking spot_left
//     {7, "Node7", {"6a6f8dbc", "e0cd6691", "50466791", "9ad78bbc", "ea6e8dbc", "20266991", "c03e6791", "1ad88bbc", "6a6e8dbc", "403f6791", "9ad88bbc"}, 11}, // only 2 from 7-8
//     {8, "Node8", {"200d6891", "20266991", "901f6991"}, 3},                                                                                                  // parking lot_right
//     {9, "Node9", {"901f6991", "20d96791", "a0d96791", "10d26791", "80d76791", "bade8bbc", "80d76791", "00d76791", "dae58dbc"}, 9},
//     {10, "Node10", {"e0246891", "60246891", "c0066991", "50256891", "e02d6891", "40066991", "d0256891", "30076991", "c0056991"}, 9},
//     {11, "Node11", {"50466791", "c03c6791", "403c6791", "c03e6791", "b03d6791", "60446791", "403f6791", "10486891", "a0d86691"}, 9},
// };
// // all rfid tags are in the sequence of 12' -- round clockwise 3 times, therefore 9 tags in total for a node

// uint8_t currentRegionId = 0;

// bool isInRegion(const String &rfid)
// {
//   for (uint8_t r = 0; r < MAX_REGIONS; r++)
//   {
//     for (uint8_t i = 0; i < regions[r].count; i++)
//     {
//       if (rfid == (regions[r].rfids[i]))
//       { // equals?
//         if (currentRegionId != regions[r].id)
//         {
//           currentRegionId = regions[r].id;
//           Serial.printf("Entered %s\n", regions[r].name);
//         }
//         return true;
//       }
//     }
//   }

//   if (currentRegionId != 0)
//   {
//     Serial.println("Left region");
//     currentRegionId = 0;
//   }
//   return false;
// }
