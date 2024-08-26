import { src, dest, watch } from "gulp";
import { deleteAsync } from "del";
import civetPlugin from "gulp-civet";
import replace from "gulp-replace";

function civetTask() {
  return src(["./src.civet/**/*.civet"])
    .pipe(
      civetPlugin({
        extension: ".ts",
        parseOptions: {
          implicitReturns: false,
          rewriteCivetImports: "\\removeCivetExtension\\",
          tab: 2
        }
      })
    )
    .pipe(replace("\\removeCivetExtension\\", ""))
    .pipe(dest("./src"));
}

function resetEnvTask() {
  return deleteAsync(["src", "out", "dist"], { force: true });
}

export const resetenv = resetEnvTask;
export const build = civetTask;
export default function () {
  watch("./src.civet/**/*.civet", civetTask);
}
