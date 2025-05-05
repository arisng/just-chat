# Styling Your Just-Chat Widget

This guide will help you completely customize the look and feel of your chat widget to match your brand and design preferences.

## Table of Contents
- [Styling Your Just-Chat Widget](#styling-your-just-chat-widget)
  - [Table of Contents](#table-of-contents)
  - [Basic Customization](#basic-customization)
    - [HTML Attributes](#html-attributes)
  - [CSS Variables](#css-variables)
  - [Advanced Styling](#advanced-styling)
    - [Custom CSS](#custom-css)
    - [Message Styling](#message-styling)
  - [Component-Specific Styling](#component-specific-styling)
    - [Chat Launcher](#chat-launcher)
    - [Chat Window](#chat-window)
    - [Input Area](#input-area)
  - [Responsive Design](#responsive-design)
  - [Examples](#examples)
    - [Minimal Dark Theme](#minimal-dark-theme)
    - [Rounded Playful Theme](#rounded-playful-theme)
    - [Corporate Professional Theme](#corporate-professional-theme)

## Basic Customization

The chat widget comes with sensible defaults but can be easily customized using HTML attributes and CSS variables.

### HTML Attributes

```html
<chat-widget 
  title="Support Chat"
  welcome-message="Hello! How can we help you today?"
  theme-color="#4A90E2"
  position="bottom-right"
  bubble-icon="💬"
  history-enabled="true"
  history-clear-button="true">
</chat-widget>
```

| Attribute | Description | Default |
|-----------|-------------|---------|
| `title` | Chat window title | "Chat with us" |
| `welcome-message` | Initial message shown to users | none |
| `theme-color` | Primary color for the widget | "#1E40AF" |
| `position` | Widget position on screen | "bottom-right" |
| `bubble-icon` | Icon inside the launcher button | "💬" |
| `history-enabled` | Enable/disable chat history | "true" |
| `history-clear-button` | Show/hide clear history button | "true" |

## CSS Variables

You can override the default styles by defining CSS variables in your stylesheet:

```css
:root {
  --theme-color: #FF5722;
  --chat-border-radius: 16px;
  --chat-window-width: 360px;
  --chat-window-height: 520px;
  --chat-font-family: 'Roboto', sans-serif;
  --message-user-bg: #FF5722;
  --message-backend-bg: #f5f5f5;
  --message-border-radius: 12px;
  --header-bg: var(--theme-color);
  --header-text-color: white;
  --input-border-color: #ddd;
  --send-button-hover-opacity: 0.8;
}
```

## Advanced Styling

### Custom CSS

For more extensive customization, you can add your own CSS rules that target the shadow DOM elements:

```css
/* Target the chat launcher */
chat-launcher::part(button) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

chat-launcher::part(button):hover {
  transform: scale(1.05);
}

/* Target the chat window */
chat-window::part(header) {
  border-bottom: 2px solid #eaeaea;
}

chat-window::part(messages) {
  background-image: linear-gradient(to bottom, #f9f9f9, #ffffff);
}
```

### Message Styling

You can customize different message types:

```css
/* User messages */
chat-window::part(message-user) {
  background-color: #4CAF50;
  color: white;
  border-radius: 18px 18px 0 18px;
}

/* Backend/system messages */
chat-window::part(message-backend) {
  background-color: #f0f0f0;
  color: #333;
  border-radius: 18px 18px 18px 0;
  white-space: break-spaces;
}

/* System messages */
chat-window::part(message-system) {
  font-style: italic;
  background-color: #fffde7;
  color: #5d4037;
}
```

## Component-Specific Styling

### Chat Launcher

The launcher button can be styled to match your website's design:

```css
chat-launcher {
  --launcher-size: 60px;
  --launcher-bg: var(--theme-color);
  --launcher-color: white;
  --launcher-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  --launcher-hover-transform: scale(1.05);
}
```

### Chat Window

Customize the main chat window appearance:

```css
chat-window {
  --window-bg: white;
  --window-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  --header-height: 60px;
  --footer-border-top: 1px solid #eee;
  --input-bg: #f9f9f9;
}
```

### Input Area

Style the message input area:

```css
chat-window::part(input-area) {
  background-color: #f8f8f8;
  padding: 12px 16px;
}

chat-window::part(input) {
  border: none;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

chat-window::part(input):focus {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
}
```

## Responsive Design

The chat widget is designed to be responsive by default, but you can customize its behavior on different screen sizes:

```css
@media (max-width: 768px) {
  chat-window {
    --chat-window-width: 100%;
    --chat-window-height: 100%;
    --chat-border-radius: 0;
  }
  
  chat-launcher {
    --launcher-size: 50px;
  }
}
```

## Examples

### Minimal Dark Theme

```css
:root {
  --theme-color: #2c3e50;
  --chat-window-width: 320px;
  --chat-window-height: 450px;
  --window-bg: #1a1a1a;
  --header-bg: #2c3e50;
  --header-text-color: #ecf0f1;
  --message-user-bg: #3498db;
  --message-backend-bg: #2c3e50;
  --message-backend-color: #ecf0f1;
  --input-bg: #2a2a2a;
  --input-color: #ecf0f1;
  --input-border-color: #3a3a3a;
}
```

### Rounded Playful Theme

```css
:root {
  --theme-color: #FF4081;
  --chat-border-radius: 24px;
  --message-border-radius: 18px;
  --launcher-size: 65px;
  --launcher-border-radius: 50%;
  --window-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
  --header-bg: linear-gradient(45deg, #FF4081, #FF6E40);
  --send-button-bg: #FF4081;
}
```

### Corporate Professional Theme

```css
:root {
  --theme-color: #0077B5;
  --chat-font-family: 'Segoe UI', sans-serif;
  --chat-border-radius: 8px;
  --message-border-radius: 6px;
  --header-bg: #0077B5;
  --window-bg: #ffffff;
  --window-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --message-user-bg: #0077B5;
  --message-backend-bg: #f2f2f2;
  --input-border-color: #dcdcdc;
}
```

By combining these styling options, you can completely transform the look and feel of your chat widget to create a seamless and branded chat experience for your users.