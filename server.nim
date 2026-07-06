# ==========================================================================
# VAIDEHI SILAI CENTER - NIM BACKEND WEB SERVER
# Serves static assets, routing, images, and handles MIME mapping securely.
# Running on Port 9090
# ==========================================================================

import std/[asynchttpserver, asyncdispatch, strutils, os, mimetypes, uri]

const PortNum = 9090

# Request Handler Callback
proc cb(req: Request) {.async.} =
  let path = decodeUrl(req.url.path)
  
  # Default root to index.html
  var filePath = if path == "/" or path == "": "index.html" else: path
  
  # Remove leading slash to resolve file relatively
  if filePath.startsWith("/"):
    filePath = filePath[1 .. ^1]
    
  # Normalize path to prevent directory traversal attacks (e.g., /../etc/passwd)
  filePath = normalizedPath(filePath)
  if filePath.contains("..") or filePath.startsWith("/") or filePath.startsWith("\\"):
    await req.respond(Http403, "403 Forbidden")
    return
    
  # Check if file exists. If not, try checking with a .html extension (pretty routing)
  if not fileExists(filePath):
    if fileExists(filePath & ".html"):
      filePath = filePath & ".html"
    else:
      await req.respond(Http404, "404 Not Found")
      return

  try:
    # Read the file content
    let content = readFile(filePath)
    
    # Determine the MIME content-type based on file extension
    let ext = splitFile(filePath).ext
    var mime = "text/plain"
    
    if ext.len > 1:
      let cleanExt = ext[1 .. ^1].toLowerAscii()
      var m = newMimetypes()
      mime = m.getMimetype(cleanExt, "text/plain")
      
      # Manual fallbacks for common extension mappings
      case cleanExt
      of "css": mime = "text/css"
      of "js": mime = "text/javascript"
      of "html": mime = "text/html"
      of "jpeg", "jpg": mime = "image/jpeg"
      of "png": mime = "image/png"
      of "svg": mime = "image/svg+xml"
      of "ico": mime = "image/x-icon"
      
    # Set headers
    let headers = newHttpHeaders([
      ("Content-Type", mime),
      ("Cache-Control", "no-cache, no-store, must-revalidate"),
      ("X-Content-Type-Options", "nosniff")
    ])
    
    await req.respond(Http200, content, headers)
  except:
    let errorMsg = getCurrentExceptionMsg()
    await req.respond(Http500, "500 Internal Server Error: " & errorMsg)

# Main Application Entrypoint
proc main() =
  let server = newAsyncHttpServer()
  echo "=========================================================================="
  echo " Vaidehi Silai Center Nim Server"
  echo " Server is active at http://localhost:", PortNum
  echo " Press Ctrl+C to terminate the process."
  echo "=========================================================================="
  
  try:
    waitFor server.serve(Port(PortNum), cb)
  except:
    echo "Fatal server error: ", getCurrentExceptionMsg()

if isMainModule:
  main()
