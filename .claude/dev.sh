#!/bin/bash
cd "/Users/veronicafemminino/Claude_Output/Seta_Varese"
export PATH="/Users/veronicafemminino/.nvm/versions/node/v24.21.0/bin:$PATH"
exec npm run dev -- --port "${PORT:-8080}"
