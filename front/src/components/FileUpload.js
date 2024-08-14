import { useState } from "react";
import { Button, TextField, Container, Box, Typography } from "@mui/material";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFile(selectedFile);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Please upload a valid CSV file.");
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (!file) {
        setMessage("No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error uploading file.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload CSV File
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="file"
            onChange={handleFileChange}
            fullWidth
            variant="outlined"
            margin="normal"
            inputProps={{ accept: ".xlsx" }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={!file}
          >
            Upload
          </Button>
        </form>
        {message && (
          <Box mt={3}>
            <Typography variant="body1">{message}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default FileUpload;
