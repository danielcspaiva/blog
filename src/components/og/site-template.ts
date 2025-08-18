// Site template with ASCII art for light theme
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
    // ASCII art for "DCSP" (compact version for OG images)
    const asciiArt = `██████╗  ██████╗███████╗██████╗ 
██╔══██╗██╔════╝██╔════╝██╔══██╗
██║  ██║██║     ███████╗██████╔╝
██║  ██║██║     ╚════██║██╔═══╝ 
██████╔╝╚██████╗███████║██║     
╚═════╝  ╚═════╝╚══════╝╚═╝`;

    // Use the provided author name or default to "Daniel Paiva"
    const author = authorName || "Daniel Paiva";
    
    // Create sections with different styling
    const sections = [
      {
        text: asciiArt,
        color: [6, 182, 212], // cyan-500 for ASCII art
        size: 24,
        weight: "Normal",
        fontFamily: "Geist", // Use available font
      },
      {
        text: description,
        color: [51, 65, 85], // navy-700 for description
        size: 32,
        weight: "Normal",
        fontFamily: "Geist",
      },
      {
        text: `By ${author}`,
        color: [100, 116, 139], // neutral-500 for author
        size: 28,
        weight: "Normal",
        fontFamily: "Geist",
      }
    ];
    
    // Combine all text for the description
    const formattedDescription = sections.map(s => s.text).join('\n\n');
    
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