// Define the template
export default {
  // Template parameters with their types
  param: {
    title: {
      type: "string",
      default: "Daniel Paiva",
    },
    description: {
      type: "string",
      default: "CTO at Quarto à Vista | Full Stack Developer",
    },
    authorName: {
      type: "string",
      default: "Daniel Paiva",
    },
  },
  // The template function that returns the canvas configuration
  template: ({ title, description, authorName }: { title: string; description: string; authorName: string }) => {
    // Use the provided author name or default to "Daniel Paiva"
    const author = authorName || "Daniel Paiva";
    
    // Format the description to include the author name with a line break
    // This will make the author name appear on a separate line
    const formattedDescription = `${description}\n\nBy ${author}`;
    
    return {
      // Main content
      title,
      description: formattedDescription,
      // Use Geist Sans fonts
      fonts: [
        "./public/fonts/GeistSans-Regular.otf",
        "./public/fonts/GeistSans-Bold.otf",
      ],
    };
  },
}; 