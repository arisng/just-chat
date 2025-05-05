# Chat Widget Configuration FAQ

## Basic Configuration Options

### How can I configure the chat widget?

There are two primary methods to configure the Just-Chat widget:

1. **Via data attributes on the script tag** (CDN approach):
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@kieng/just-chat/dist/just-chat.umd.js"
           data-webhook-url="https://your-backend.com/chat"
           data-theme-color="#1E40AF"
           data-position="bottom-right"
           data-title="Chat with us"
           data-welcome-message="How can we help you today?"
           data-history-enabled="true"
           data-history-clear-button="true"
           defer>
   </script>
   ```

2. **Via JavaScript configuration object** (NPM/import approach):
   ```javascript
   import { initChatPopup } from '@kieng/just-chat';

   initChatPopup({
     webhookUrl: 'https://your-backend.com/chat',
     themeColor: '#1E40AF',
     position: 'bottom-right',
     title: 'Chat with us',
     welcomeMessage: 'How can we help you today?',
     history: {
       enabled: true,
       clearButton: true
     }
   });
   ```

### What configuration options are available?

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `webhookUrl` | string | - | (Required) Backend endpoint URL for processing messages |
| `themeColor` | string | '#1E40AF' | Primary color for UI elements |
| `position` | 'bottom-right' \| 'bottom-left' | 'bottom-right' | Widget position on screen |
| `title` | string | 'Chat with us' | Chat window title |
| `welcomeMessage` | string | '' | Initial message shown when chat opens |
| `history.enabled` | boolean | true | Enable/disable chat history persistence |
| `history.clearButton` | boolean | true | Show/hide the clear history button |

## Dynamic Configuration

### Can I change the configuration after initialization?

Yes, you can update the widget's configuration dynamically by:

1. Removing the existing widget
2. Creating a new one with the updated configuration

```javascript
// Get reference to existing widget
const existingWidget = document.querySelector('chat-widget');

// Remove it if it exists
if (existingWidget) {
  existingWidget.remove();
}

// Create a new widget with updated configuration
const newWidget = initChatPopup({
  webhookUrl: 'https://your-backend.com/chat',
  themeColor: newThemeColor,
  // Other updated options
});
```

### How can I respond to user input in the configuration?

You can listen for input changes and update the widget accordingly:

```javascript
document.querySelectorAll('.config-controls input').forEach(input => {
  input.addEventListener('change', () => {
    // Remove old widget
    widget.remove();
    
    // Create new widget with updated config
    widget = initChatPopup({
      webhookUrl: document.getElementById('webhookUrl').value,
      themeColor: document.getElementById('themeColor').value,
      // Other options
    });
  });
});
```

## Backend Integration

### How do I integrate with a .NET backend?

1. Set the `webhookUrl` to your ASP.NET Core endpoint
2. Create a controller that accepts POST requests with the proper JSON structure
3. Return responses in the expected format

Example .NET controller:

```csharp
[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    [HttpPost]
    public IActionResult Post([FromBody] ChatRequest request)
    {
        // Process the chat message
        
        return Ok(new ChatResponse
        {
            Response = $"Your backend received: {request.Message}"
        });
    }
}

public class ChatRequest
{
    public string Message { get; set; }
    public string Timestamp { get; set; }
    public string SessionId { get; set; }
    public ChatContext Context { get; set; }
    public List<ChatMessage> History { get; set; }
}

public class ChatResponse
{
    public string Response { get; set; }
}
```

### What is the webhook request/response format?

**Request format:**
```json
{
  "message": "User's message",
  "timestamp": "ISO8601 timestamp",
  "sessionId": "Unique session identifier",
  "context": {
    "url": "Current page URL"
  },
  "history": [
    {
      "id": "message-id",
      "text": "message content",
      "sender": "user",
      "timestamp": "ISO8601 timestamp"
    }
  ]
}
```

**Expected response format:**
```json
{
  "response": "Text message to display to the user"
}

