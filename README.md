# 🔐 Sichr CLI

**Sichr** is a simple and minimal CLI tool to analyze password strength and generate new secure passwords.
Completely **offline** and with not API Requests.

## 🌟 Highlights

Here are the main features of **Sichr**:

- Password Analyzer
  - Rates the strength of your password on a scale of 0 - 100
  - Provides **warnings** for very **insecure or widely unsupported** passwords
  - Creates hints to increase the strength of your password

## Installation

### Requirements

- Node.js >= 22 ([Download here](https://nodejs.org/en/download))

### using npx

```bash
    npx @nils0xff/sichr
```

### via npm

```bash
    npm install -g @nils0xff/sichr
    #start interactive mode
    sichr

    # run specific command
    node dist/index.js [command] [args]
```

### build it yourself

```bash
    git clone https://github.com/Nils0xFF/sichr.git
    npm install

    # start interactive mode
    ./run.sh

    # run with arguments
    node dist/index.js [command] [args]
```

## Commands

### Analyze

This command will analyze the strength of your password

#### Usage

```bash
    #start interactive mode
    sichr analyze [password]
```

If you do not include the password in the command the CLI will ask you to enter one.

#### Example Result

```bash
Your password scores 60 out of 100
Suggestions:
 - Increase the length of your password
 - Add special characters to your password
```

### Generate (Work in Progress)

This command is not supported yet

## Roadmap

- [x] First working version of password analyzer
- [ ] Add option to check list of common passwords (offline)
- [ ] Add option to add custom list(s) of common passwords
- [ ] Add Entropy calculation to negativly rate parts like "3456" or "efg"
- [ ] Password generate with length and charset options
