export const detectText = async (fileContent, setText, setDataEntry, setLoading, setPhoto, lang) => {
  const base64 = fileContent.split(',')[1];
  console.log("fileContent", fileContent)
  const requestBody = {
    requests: [{
      image: { content: base64 },
      features: [{ type: "TEXT_DETECTION" }]
    }]
  };

  
  try {
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      }
    );
    const data = await response.json();
    console.log('Response:', data);
    const text = data.responses[0].fullTextAnnotation.text || ""
    setText(text);
    if (lang == 'geez') {
      setDataEntry((prevData)=>({...prevData,geez:text.toString()}));
    } else {
      setDataEntry((prevData)=>({...prevData,amaric:text}));
    }
    
    console.log(data.responses[0].fullTextAnnotation.text)
    // setLabels(data.responses[0].labelAnnotations || []);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
    setPhoto(null)
  }
}

