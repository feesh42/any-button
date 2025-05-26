package main

import (
	"encoding/binary"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"os/exec"
)

type Message struct {
    Repo    string `json:"repo"`
    IssueId string `json:"issueId"`
    IDE     string `json:"ide"`
}


func main() {
	homeDir	, _ := os.UserHomeDir()
  for {
      lengthBytes := make([]byte, 4)
      _, err := io.ReadFull(os.Stdin, lengthBytes)
      if err != nil {
          return // Probably closed by Chrome
      }
      length := binary.LittleEndian.Uint32(lengthBytes)
      messageBytes := make([]byte, length)
      _, err = io.ReadFull(os.Stdin, messageBytes)
      if err != nil {
          return
      }
      var msg Message
      if err := json.Unmarshal(messageBytes, &msg); err != nil {
          sendMessage(map[string]interface{}{"error": err.Error()})
          continue
      }
      repoPath := fmt.Sprintf(`%s\Documents\%s`, homeDir, msg.Repo)
      command := fmt.Sprintf(`cd /d %s && git checkout %s && code .`, repoPath, msg.IssueId)
      out, err := exec.Command("cmd", "/C", command).CombinedOutput()
      if err != nil {
          sendMessage(map[string]interface{}{"success": false, "error": string(out) + " " + err.Error() + " " + command})
      } else {
          sendMessage(map[string]interface{}{"success": true, "output": string(out)})
      }
  }
}

func sendMessage(message map[string]interface{}) {
    encoded, _ := json.Marshal(message)
    length := uint32(len(encoded))
    binary.Write(os.Stdout, binary.LittleEndian, length)
    os.Stdout.Write(encoded)
}
