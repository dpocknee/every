					;-*-Lisp-*-

; This was written to update the chord.js file with extra tab notation.
(progn
  (save-current-buffer
    (set-buffer "chords2.js")
    (setq liner 10)
    (dotimes (number 319)
	     (progn
	       (goto-line liner)
	       (setq stringer (buffer-substring (line-beginning-position) (line-end-position)))
	       (setq liner (+ liner 1))
	       (goto-line liner)
	       (insert (format "\t\"tab\" : %s" (nth 1 (split-string stringer ":"))))
	       (newline)
	       (setq liner (+ liner 12))
	       )
	     )
    )
  )
    
