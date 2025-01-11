export type Branch = string | (() => string);

function resolveBranch(branch: Branch) {
    return typeof branch === 'string' ? branch : branch();
}

class PreprocessorStatement {
    res?: string;

    constructor(cond: boolean, branch: Branch) {
        if (cond) this.res = resolveBranch(branch);
    }

    elif(cond: boolean, branch: Branch) {
        if (cond) this.res ??= resolveBranch(branch);
        return this;
    }

    else = (branch: Branch) => this.res ?? resolveBranch(branch);

    toString = () => this.res ?? '';

    get [Symbol.toStringTag]() { return this.toString(); }
}

export function preprocessors(flags: number) {
    return {
        ifdef(sym: number, branch: Branch) {
            return new PreprocessorStatement((flags & sym) === sym, branch);
        },
        ifndef(sym: number, branch: Branch) {
            return new PreprocessorStatement((flags & sym) !== sym, branch);
        },
    };
}

export function wrapWithIncrement<T>(fn: (counter: number) => T, start = 0): () => T {
    return () => fn(start++);
}
