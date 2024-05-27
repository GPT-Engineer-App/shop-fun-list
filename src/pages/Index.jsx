import React, { useState, useEffect } from "react";
import { Container, VStack, HStack, Input, Button, Text, Checkbox, IconButton, useToast, Progress } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";

const Index = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const addItem = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Error",
        description: "Item cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setItems([...items, { text: inputValue, completed: false }]);
    setInputValue("");
  };

  const toggleItemCompletion = (index) => {
    const newItems = items.map((item, i) => (i === index ? { ...item, completed: !item.completed } : item));
    setItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Gamified Shopping List</Text>
        <HStack width="100%">
          <Input
            placeholder="Add a new item"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addItem();
            }}
          />
          <IconButton aria-label="Add item" icon={<FaPlus />} onClick={addItem} />
        </HStack>
        <VStack spacing={2} width="100%">
          {items.map((item, index) => (
            <HStack key={index} width="100%" justifyContent="space-between">
              <Checkbox isChecked={item.completed} onChange={() => toggleItemCompletion(index)}>
                <Text as={item.completed ? "s" : "span"}>{item.text}</Text>
              </Checkbox>
              <IconButton aria-label="Remove item" icon={<FaTrash />} onClick={() => removeItem(index)} />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
