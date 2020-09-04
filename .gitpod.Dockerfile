FROM gitpod/workspace-full

RUN curl -fsSL https://deno.land/x/install/install.sh | sh

RUN export DENO_INSTALL="/home/gitpod/.deno"
RUN export PATH="$DENO_INSTALL/bin:$PATH"