// 1. terminal
const out = document.getElementById('output');
const input = document.getElementById('cmd-input');

// ----------------------------------------
// UPDATE THIS with your real projects
// ----------------------------------------
const projects = [
    { name: 'proj1', date: '22/01/2023', desc: 'Platform for cattle farmers', tech: 'Angular / SCSS', url: '/projects/cattlenet' },
    { name: 'proj2-v2', date: '22/01/2025', desc: 'Personal portfolio site', tech: 'HTML / Tailwind', url: '/projects/portfolio' },
    { name: 'proj3-v5', date: '22/01/2026', desc: 'Analytics dashboard', tech: 'React / Recharts', url: '/projects/dashboard' },
];
// ----------------------------------------

const commands = { help, ls, cd, clear, whoami, cat };

function print(text, cls = '') {
    const d = document.createElement('div');
    d.className = 'line ' + cls;
    d.textContent = text;
    out.appendChild(d);
}

function printHTML(html) {
    const d = document.createElement('div');
    d.className = 'line';
    d.innerHTML = html;
    out.appendChild(d);
}

function welcome() {
    print('');
    print('  ███╗   ██╗ █████╗ ████████╗███████╗', 'bright');
    print('  ████╗  ██║██╔══██╗╚══██╔══╝██╔════╝', 'bright');
    print('  ██╔██╗ ██║███████║   ██║   █████╗  ', 'bright');
    print('  ██║╚██╗██║██╔══██║   ██║   ██╔══╝  ', 'bright');
    print('  ██║ ╚████║██║  ██║   ██║   ███████╗', 'bright');
    print('');
    print("  Welcome to Nate's portfolio terminal.", 'dim');
    print("  Type 'help' to see available commands.", 'dim');
    print('');
}

function cat() {
  const art = [
    '.................:::.:............:',
    '..............::-===----:::::..:::.',
    '.:::::::-::::-=+=++++++=---:::::...',
    '..:----=====+++********+*+=--::....',
    '..:--======+*##########***+++==-...',
    '.--====+*****####%%%%%####*+*+++-:.',
    '..====+*#####*#%%%%%%%%#######*+=-.',
    '.:===+*#######%%%%%%%%%###*=--:--:.',
    '.:-==+**=-----=*%%%%%%#*#*=*###**=.',
    '..:-=+*###%%%%#*####**++=+*#%###+- ',
    '...:=+##%%%%%%%%%###***+==*####*=:.',
    '....-=+*#%%%%@%%%%#+++++=-*###+:...',
    '....:=++*###%%%%%%*=====-=#%%#+:...',
    '......:-=+++#%%%%%%#+---=#####*:...',
    '.......-=-==*###%%%#*=-=+*##*+:....',
    '......:--==--=**##**=----===-:.....',
    '......:--=+++==----==----:..:::....',
  ];

  print('');
  art.forEach(line => print(line, 'bright'));
  print('meow~', 'dim');
  print('');
}

function help() {
    print('');
    print('  available commands:', 'info');
    print('');
    print('  ls          list all projects', 'info');
    print('  cd          navigate to a project  (e.g. cd cattlenet)', 'info');
    print('  whoami      about me', 'info');
    print('  clear       clear the terminal', 'info');
    print('');
}

function ls() {
    print('');
    print('  ~/projects', 'info');
    print('  DD/MM/YYYY', 'dim');
    print('');
    projects.forEach(p => {
        printHTML(`  <span style="color:#00ff7f">${p.date}</span>  <span style="color:#00cc66">${p.name}/</span>  <span style="color:#555">${p.desc}</span>`);
    });
    print('');
    print("  tip: type 'cd <project>' to open one.", 'dim');
    print('');
}

function cd(args) {
    if (!args) {
        print('');
        print('  usage: cd <project-name>', 'info');
        print('');
        ls();
        return;
    }
    const proj = projects.find(p => p.name === args.trim().toLowerCase());
    if (!proj) {
        print('');
        print(`  cd: ${args}: no such directory`, 'err');
        print("  type 'ls' to see available projects.", 'dim');
        print('');
        return;
    }
    print('');
    print(`  /${proj.name}`, 'bright');
    print('  ' + '─'.repeat(30), 'dim');
    print(`  ${proj.desc}`, 'dir');x
    print(`  stack: ${proj.tech}`, 'dim');
    print('');
    printHTML(`  <span style="color:#555">[ </span><a href="${proj.url}" style="color:#00cc66;text-decoration:underline">view project</a><span style="color:#555"> ]</span>`);
    print('');
}

function whoami() {
    print('');
    print('  i am a frontend designer | ui/ux designer | songwriter | human', 'bright');
    print('  yearn to learn.', 'dim');
    print('');
}

function clear() {
    out.innerHTML = '';
}

input.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const raw = input.value.trim();
    if (!raw) return;

    printHTML(`<span style="color:#555">nate@portfolio:~$</span> <span style="color:#fff">${raw}</span>`);
    input.value = '';

    const [cmd, ...rest] = raw.split(' ');
    const args = rest.join(' ');

    if (commands[cmd]) {
        commands[cmd](args);
    } else {
        print('');
        print(`  command not found: ${cmd}`, 'err');
        print("  type 'help' for available commands.", 'dim');
        print('');
    }

    out.scrollTop = out.scrollHeight;
});

welcome();