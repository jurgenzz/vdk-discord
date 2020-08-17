const args = Deno.args;

const input = args[1];
const program = args[0];
const print = (output: string) => {
  console.log(output);
};
try {
  eval(program);
} catch (err) {
  console.log(err);
}
