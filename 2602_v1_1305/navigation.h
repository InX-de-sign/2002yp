#ifndef NAVIGATION_H
#define NAVIGATION_H

#include <Arduino.h>
#include "Sensor.hpp"
#include "shared_vars.h"
#include "MotorControl.hpp"
#include "LineTracking.hpp"

#define MAX_PATH_LENGTH 8
#define MAX_PATHS 66
#define TOTAL_NODES_CONDITIONS 54

const uint8_t task3_node6 = 1;
const uint8_t task3_node8 = 2;

const uint8_t task4_node1 = 1; 
const uint8_t task4_node4 = 2;

struct NodeCondition {
  bool active;       
  const char* name; 
  uint8_t lastNode;
  uint8_t curNode;
  uint8_t nextNode; 
  void (*action)();  
};
extern NodeCondition ALL_NODE_CONDITIONS[TOTAL_NODES_CONDITIONS];

struct Path {
    uint8_t start;
    uint8_t end;
    uint8_t nodes[MAX_PATH_LENGTH];
    uint8_t length;
    uint16_t cost;
};

namespace Navigation {
  void handleTask1();
  void handleTask2();
  void handleTask3(uint8_t sub_case); 
  void handleTask4(uint8_t sub_case);
  void handleTask5(uint8_t Start_point, uint8_t End_point);
  Path* getOptimalPath(uint8_t Start_point, uint8_t End_point);
  // void navigatePath(const Path& path);
  // bool stopAtEndingPoint(uint8_t End_point);
  void crossNodes(Path* optimalPath);
}

#endif