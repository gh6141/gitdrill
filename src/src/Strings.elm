module Strings exposing (miniLaTeX)


sourceText1 =
    """
  
This is a \\italic{very important} test.
\\begin{itemize}
\\item This is a \\blue{Blue} item.
\\end{itemize}
"""



miniLaTeX ="""
  
This is a \\italic{very important} test.
\\begin{itemize}
\\item This is a \\blue{Blue} item.
\\end{itemize}
"""