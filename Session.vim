let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Documents/projects/pensatta/pensattanet-frontend-vite
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +40 ~/Documents/projects/pensatta/pensattanet-frontend-vite/src/routes/exercises/ex18/ex18.jsx
badd +0 ~/Documents/projects/pensatta/pensattanet-frontend-vite/src/routes/exercises/ex18/data.json
argglobal
%argdel
edit ~/Documents/projects/pensatta/pensattanet-frontend-vite/src/routes/exercises/ex18/ex18.jsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 53 + 55) / 110)
exe '2resize ' . ((&lines * 53 + 55) / 110)
argglobal
balt ~/Documents/projects/pensatta/pensattanet-frontend-vite/src/routes/exercises/ex18/ex18.jsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 40 - ((35 * winheight(0) + 26) / 53)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 40
normal! 018|
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/projects/pensatta/pensattanet-frontend-vite/src/routes/exercises/ex18/data.json", ":p")) | buffer ~/Documents/projects/pensatta/pensattanet-frontend-vite/src/routes/exercises/ex18/data.json | else | edit ~/Documents/projects/pensatta/pensattanet-frontend-vite/src/routes/exercises/ex18/data.json | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/projects/pensatta/pensattanet-frontend-vite/src/routes/exercises/ex18/data.json
endif
balt ~/Documents/projects/pensatta/pensattanet-frontend-vite/src/routes/exercises/ex18/ex18.jsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 1 - ((0 * winheight(0) + 26) / 53)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 1
normal! 0
wincmd w
exe '1resize ' . ((&lines * 53 + 55) / 110)
exe '2resize ' . ((&lines * 53 + 55) / 110)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
