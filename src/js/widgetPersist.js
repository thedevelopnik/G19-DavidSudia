// in localstorage there is a key 'widgets' with a value of an array
// if there is nothing in the array assigned to that key, getting started is displayed
// if there is something in that key, then the functions to create the widgets assigned to those values are fired
// which means we iterate over the array looking for specific keywords
// then fire associated createWidget functions
// when a widget is created, its associated key term is added to the array
// when a widget is removed, iterate over the array and remove the key term