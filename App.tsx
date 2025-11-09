import React, { useState, useEffect, useRef } from 'react';

const LOCAL_STORAGE_KEY = 'digital-notepad-content-html';

const Toolbar: React.FC<{ 
  onFormat: (command: string, value?: string) => void;
  onImageUploadClick: () => void;
}> = ({ onFormat, onImageUploadClick }) => {
  const handleMouseDown = (e: React.MouseEvent, command: string, value?: string) => {
    e.preventDefault();
    onFormat(command, value);
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, command: string) => {
    onFormat(command, e.target.value);
  };

  return (
    <div className="p-2 bg-gray-200 border-b border-gray-300 flex items-center flex-wrap gap-x-3 gap-y-2 sticky top-0 z-10">
      {/* Font Family */}
      <div className="flex items-center gap-1">
        <select onChange={(e) => handleSelectChange(e, 'fontName')} defaultValue="monospace" className="text-sm border border-gray-300 rounded-sm px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="monospace">Monospace</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      {/* Font Size */}
      <div className="flex items-center gap-1">
         <select onChange={(e) => handleSelectChange(e, 'fontSize')} defaultValue="3" className="text-sm border border-gray-300 rounded-sm px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="1">Smallest</option>
          <option value="2">Small</option>
          <option value="3">Normal</option>
          <option value="4">Medium</option>
          <option value="5">Large</option>
          <option value="6">Extra Large</option>
          <option value="7">Biggest</option>
        </select>
      </div>
      
      <div className="h-5 w-px bg-gray-300"></div>

      {/* Font Style */}
      <div className="flex items-center gap-1">
        <button onMouseDown={(e) => handleMouseDown(e, 'bold')} className="w-7 h-7 flex items-center justify-center hover:bg-gray-300 rounded-sm" aria-label="Bold">
          <b className="font-bold text-lg">B</b>
        </button>
        <button onMouseDown={(e) => handleMouseDown(e, 'italic')} className="w-7 h-7 flex items-center justify-center hover:bg-gray-300 rounded-sm" aria-label="Italic">
          <i className="italic font-serif text-lg">I</i>
        </button>
        <button onMouseDown={(e) => handleMouseDown(e, 'underline')} className="w-7 h-7 flex items-center justify-center hover:bg-gray-300 rounded-sm" aria-label="Underline">
          <u className="text-lg">U</u>
        </button>
      </div>
      
      <div className="h-5 w-px bg-gray-300"></div>

      {/* Color Controls */}
      <div className="flex items-center gap-3">
          {/* Font Color */}
          <div className="flex items-center" title="Font Color">
              <span className="font-serif font-bold text-lg leading-none mr-1" aria-hidden="true">A</span>
              <input 
                  type="color"
                  onChange={(e) => onFormat('foreColor', e.target.value)}
                  defaultValue="#1f2937"
                  className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer"
                  aria-label="Font Color"
              />
          </div>

          {/* Highlight Color */}
          <div className="flex items-center" title="Highlight Color">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-1" aria-hidden="true">
                  <path d="M12.879.621a.5.5 0 0 0-.707 0L10.5 2.293 13.707 5.5l1.671-1.672a.5.5 0 0 0 0-.707L12.879.621z"/>
                  <path d="M10.5 2.293L2.146 10.646a.5.5 0 0 0 0 .707l2.122 2.121a.5.5 0 0 0 .707 0L13.707 5.5 10.5 2.293zm-9.409 9.41a.5.5 0 0 0 0 .707l.707.707a.5.5 0 0 0 .707 0l.707-.707a.5.5 0 0 0 0-.707l-.707-.707a.5.5 0 0 0-.707 0l-.707.707z"/>
              </svg>
              <input 
                  type="color"
                  onChange={(e) => onFormat('backColor', e.target.value)}
                  defaultValue="#ffff00"
                  className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer"
                  aria-label="Highlight Color"
              />
          </div>
      </div>

      <div className="h-5 w-px bg-gray-300"></div>

      {/* Alignment */}
      <div className="flex items-center gap-1">
        <button onMouseDown={(e) => handleMouseDown(e, 'justifyLeft')} className="w-7 h-7 flex items-center justify-center hover:bg-gray-300 rounded-sm" aria-label="Align Left">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5"/></svg>
        </button>
        <button onMouseDown={(e) => handleMouseDown(e, 'justifyCenter')} className="w-7 h-7 flex items-center justify-center hover:bg-gray-300 rounded-sm" aria-label="Align Center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/></svg>
        </button>
        <button onMouseDown={(e) => handleMouseDown(e, 'justifyRight')} className="w-7 h-7 flex items-center justify-center hover:bg-gray-300 rounded-sm" aria-label="Align Right">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/></svg>
        </button>
         <button onMouseDown={(e) => handleMouseDown(e, 'justifyFull')} className="w-7 h-7 flex items-center justify-center hover:bg-gray-300 rounded-sm" aria-label="Justify">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/></svg>
        </button>
      </div>

      <div className="h-5 w-px bg-gray-300"></div>
      
      {/* Insert Image */}
      <div className="flex items-center gap-1">
        <button onMouseDown={(e) => { e.preventDefault(); onImageUploadClick(); }} className="w-7 h-7 flex items-center justify-center hover:bg-gray-300 rounded-sm" aria-label="Insert Image">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg>
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [note, setNote] = useState<string>('');
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load note from local storage on initial render
  useEffect(() => {
    try {
      const savedNote = localStorage.getItem(LOCAL_STORAGE_KEY);
      const initialContent = savedNote || '<div>Start typing...</div>';
      setNote(initialContent);
      if (editorRef.current) {
        // Set the initial content imperatively to avoid re-render issues
        editorRef.current.innerHTML = initialContent;
      }
    } catch (error) {
      console.error("Failed to read from local storage", error);
    }
  }, []);

  // Save note to local storage whenever it changes
  useEffect(() => {
    try {
      // Don't save the initial placeholder text if it hasn't been modified
      if (note !== '<div>Start typing...</div>') {
        localStorage.setItem(LOCAL_STORAGE_KEY, note);
      }
    } catch (error) {
      console.error("Failed to write to local storage", error);
    }
  }, [note]);

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
        setNote(editorRef.current.innerHTML); // Sync React state with DOM
        editorRef.current.focus();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        handleFormat('insertImage', dataUrl);
      };
      reader.readAsDataURL(file);
    }
     // Reset file input value to allow uploading the same file again
    if(event.target) {
      event.target.value = '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased">
      <main className="bg-zinc-700 flex-grow w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
        <style>{`
          .editor-content img {
            max-width: 90%;
            height: auto;
            cursor: move;
            resize: both;
            overflow: auto;
            border: 2px dashed transparent;
            transition: border-color 0.2s;
          }
          .editor-content img:hover {
            border-color: #a0aec0; /* gray-400 */
          }
        `}</style>
        
        {/* Hidden file input for image uploads */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />

        {/* Main notepad container */}
        <div className="relative w-full max-w-3xl h-[90vh] max-h-[900px] bg-[#FEFBEA] shadow-2xl rounded-sm flex flex-col border-t-[24px] border-zinc-400">
          
          {/* Decorative holes */}
          <div className="absolute top-[-12px] left-1/4 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-700 ring-2 ring-zinc-500"></div>
          <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-700 ring-2 ring-zinc-500"></div>
          <div className="absolute top-[-12px] left-3/4 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-700 ring-2 ring-zinc-500"></div>
          
          <Toolbar onFormat={handleFormat} onImageUploadClick={() => fileInputRef.current?.click()} />

          {/* Notepad Body */}
          <div className="flex-grow flex relative overflow-y-auto">
            {/* Red Margin Line */}
            <div className="absolute top-0 left-12 w-px h-full bg-red-400/80 z-0"></div>
            
            <div
              ref={editorRef}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={(e) => setNote(e.currentTarget.innerHTML)}
              className="editor-content w-full h-auto min-h-full flex-grow bg-transparent resize-none outline-none text-zinc-800 text-lg leading-8 tracking-wide px-4 pl-16 pt-8 bg-repeat-y bg-[length:100%_32px] bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%25%27 height=%2732px%27%3e%3cline x1=%270%27 y1=%2731px%27 x2=%27100%25%27 y2=%2731px%27 stroke=%27%23bae6fd%27 stroke-width=%271%27/%3e%3c/svg%3e')]"
              spellCheck="false"
            />
          </div>
        </div>
      </main>

      <footer className="bg-[#0D1117] text-gray-300 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 md:gap-8">
          {/* Contact Details */}
          <div className="text-sm space-y-1">
            <h3 className="font-bold text-white mb-2 text-base">Contact Details</h3>
            <p>"Chinthra", Kadirandola, Elpitiya</p>
            <p>Mobile: 0773064421</p>
            <p>Email: <a href="mailto:randeerlalanga92@gmail.com" className="text-blue-400 hover:underline">randeerlalanga92@gmail.com</a></p>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400 order-last md:order-none">
            <p>&copy; 2025 Randheer Lalanga. All rights reserved.</p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Portfolio" className="text-gray-300 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="text-gray-300 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
