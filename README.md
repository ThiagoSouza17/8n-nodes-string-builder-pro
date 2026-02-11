# n8n-nodes-string-builder-pro

This node is designed to efficiently solve the challenge of accumulating strings within n8n loops. It simulates the behavior of a traditional `StringBuilder` (common in languages like C# and Java), enabling the concatenation of data from multiple items into a single, persistent variable throughout the workflow execution.

## 🚀 Why use this node?

In standard n8n, concatenating strings within a loop (e.g., using 'Split in Batches') can be cumbersome. It often requires custom Code nodes or leads to memory issues when handling large datasets.

**Key Benefits:**

* **Data Persistence:** Uses `$getWorkflowStaticData` to ensure text is not lost between loop iterations.
* **Performance:** Optimized for low memory consumption by accumulating only the final string instead of complex arrays of objects.
* **Hassle-Free:** Visual interface to configure delimiters (new lines, commas, etc.) without needing to write JavaScript.

## 📦 Installation

### Via Web UI (Recommended)

1.  In your n8n instance, go to **Settings > Community Nodes**.
2.  Click on **Install a node**.
3.  Enter: `n8n-nodes-string-builder-pro`.
4.  Click **Install**.

### Via CLI

If you are running a self-hosted installation:

```bash
npm install n8n-nodes-string-builder-pro