// Ruta POST en tu servidor
router.post('/api/views/chat', async (req, res) => {
    try {
      console.log('Received POST request to /api/views/chat:', req.body);
  
      // Lógica para guardar el mensaje en la base de datos...
  
      res.status(201).json({
        status: 'success',
        message: 'Message saved successfully',
        payload: savedMessage,
      });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  });