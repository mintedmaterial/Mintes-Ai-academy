from pathlib import Path
from html import escape

ROOT = Path(r'\c\Users\Minte\Desktop\Mintes-Ai-academy-publish\episodes\02-hermes-first-workflow')
OUT = ROOT / 'assets' / 'scenes-detailed'
OUT.mkdir(parents=True, exist_ok=True)

BG = ['#08111f', '#091426', '#0b1422', '#101329', '#0d1726', '#111526', '#08111f']
CYAN = '#65e6d0'
WHITE = '#f3f7ff'
MUTED = '#a9b7d0'
DIM = '#7081a4'
AMBER = '#ffcf70'
PURPLE = '#d59cff'
GREEN = '#8ff0b2'


def text(x, y, s, size=28, fill=WHITE, family='Arial', weight='400', anchor='start'):
    return f'<text x="{x}" y="{y}" fill="{fill}" font-family="{family}" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}">{escape(s)}</text>'


def line(x1, y1, x2, y2, color=DIM, width=2):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{width}"/>'


def rect(x, y, w, h, fill='#111d31', stroke='#263754', rx=18, sw=2):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'


def terminal(x, y, w, h, rows, title='TERMINAL / RUN THIS'):
    out = rect(x, y, w, h, '#07101c', '#2b4669', 18, 2)
    out += rect(x, y, w, 48, '#12233c', '#2b4669', 18, 2)
    out += text(x+24, y+32, title, 20, CYAN, 'Arial', '700')
    out += text(x+w-88, y+32, '●  ●  ●', 15, DIM, 'Arial', '700')
    yy = y + 88
    for content, color, size in rows:
        out += text(x+28, yy, content, size, color, 'monospace')
        yy += size + 22
    return out


def pill(x, y, label, color=CYAN, w=None):
    w = w or (len(label)*13 + 34)
    return rect(x, y, w, 38, '#102a3a', color, 19, 1) + text(x+w/2, y+26, label, 17, color, 'Arial', '700', 'middle')


def base(i, title, subtitle):
    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">', f'<rect width="1920" height="1080" fill="{BG[i-1]}"/>']
    svg += [f'<circle cx="1700" cy="100" r="320" fill="#133b54" opacity=".34"/>', f'<circle cx="80" cy="1040" r="330" fill="#2c1d5a" opacity=".22"/>']
    svg += [text(100, 82, 'MINTE AI ACADEMY  /  EPISODE 02', 22, CYAN, 'Arial', '700'), text(100, 168, title, 58, WHITE, 'Arial', '700'), text(100, 220, subtitle, 27, MUTED, 'Arial')]
    svg += [line(100, 270, 1820, 270, CYAN, 2)]
    svg += [text(100, 1030, 'Cleo  •  Hermes Agent  •  privacy-safe instructional visualization', 19, DIM, 'monospace')]
    return svg

scenes = []

# 01: promise and order
s = base(1, 'YOUR FIRST USEFUL HERMES WORKFLOW', 'Installing the agent is step zero. Build one small loop you can verify.')
s += [text(100, 330, 'THE SAFE ORDER', 22, CYAN, 'Arial', '700')]
steps = [('1', 'VERIFY', 'binary + config'), ('2', 'CHAT', 'real answer'), ('3', 'SKILL', 'repeatable rules'), ('4', 'PROFILE', 'isolated state'), ('5', 'CRON', 'local artifact')]
for j,(n,a,b) in enumerate(steps):
    x=100+j*344
    s += [rect(x, 390, 300, 230, '#111e33', CYAN if j==0 else '#263754', 22, 3 if j==0 else 2), text(x+28, 446, n, 30, CYAN, 'monospace', '700'), text(x+28, 500, a, 30, WHITE, 'Arial', '700'), text(x+28, 550, b, 22, MUTED, 'monospace')]
    if j<4: s += [text(x+315, 510, '→', 34, AMBER, 'Arial', '700')]
s += [rect(100, 700, 1720, 180, '#0e2231', '#2c6a76', 18, 2), text(140, 760, 'Viewer result', 21, CYAN, 'Arial', '700'), text(140, 812, 'A harmless recurring research brief, with a command-by-command verification gate.', 30, WHITE, 'Arial'), text(140, 852, 'No secrets on screen. No public delivery. No “green light” accepted without a real result.', 22, MUTED, 'Arial')]
scenes.append(s)

# 02: install verification
s = base(2, '01 / VERIFY WHAT IS ACTUALLY INSTALLED', 'Run these in order. Each command answers a different question.')
s += [terminal(100, 325, 930, 520, [('$ hermes --version', MUTED, 27), ('Hermes Agent v0.18.2', GREEN, 29), ('', MUTED, 20), ('$ hermes config path', MUTED, 27), ('C:/Users/you/.hermes', GREEN, 25), ('', MUTED, 20), ('$ hermes config check', MUTED, 27), ('Configuration Status  ✓', GREEN, 27)])]
s += [rect(1110, 325, 710, 520, '#101b30', '#2b4669', 18, 2), text(1150, 380, 'WHAT TO LOOK FOR', 22, CYAN, 'Arial', '700')]
for y,head,body in [(445,'--version','Which executable answered?'),(545,'config path','Which Hermes home is active?'),(645,'config check','Are files missing or stale?'),(745,'setup / model','Is the provider ready?')]:
    s += [pill(1150,y-30,head,CYAN), text(1150, y+38, body, 22, MUTED, 'Arial')]
s += [text(100, 925, 'A successful install proves the command exists. It does not prove a model can answer.', 24, AMBER, 'Arial', '700')]
scenes.append(s)

# 03: real chat
s = base(3, '02 / PROVE ONE REAL CHAT', 'Do not add gateways or automation while the smallest loop is broken.')
s += [terminal(100, 335, 1040, 390, [('$ hermes chat -q "Reply with exactly three words:', MUTED, 24), ('  Hermes is working"', MUTED, 24), ('Hermes is working', GREEN, 31), ('', MUTED, 18), ('$ hermes doctor', MUTED, 26), ('Provider   ✓   Model   ✓   Auth   ✓', GREEN, 27)])]
s += [rect(1220, 335, 600, 390, '#111e33', '#2b4669', 18, 2), text(1260, 395, 'THIS IS THE GATE', 22, CYAN, 'Arial', '700')]
for y, label, body in [(470,'INPUT','tiny prompt'),(565,'OUTPUT','actual model response'),(660,'FAILURE','stay here; run doctor')]:
    s += [pill(1260,y-28,label, AMBER if label=='FAILURE' else CYAN), text(1260,y+40,body,22,MUTED,'Arial')]
s += [rect(100, 800, 1720, 105, '#0e2231', '#2c6a76', 16, 2), text(135, 865, 'Proof standard: one prompt in → one real answer out. A port, process, or saved key is not proof.', 25, WHITE, 'Arial', '700')]
scenes.append(s)

# 04: skill anatomy
s = base(4, '03 / TURN A REPEATED PROCEDURE INTO A SKILL', 'Skills hold reusable operating knowledge. Keep them focused and verifiable.')
s += [terminal(100, 335, 760, 320, [('$ hermes skills list', MUTED, 25), ('episode-production', GREEN, 26), ('research-brief', GREEN, 26), ('', MUTED, 18), ('$ hermes skills search "research"', MUTED, 23), ('2 matching skills', GREEN, 24)])]
s += [rect(950, 335, 870, 510, '#111e33', '#2b4669', 18, 2), text(990, 395, 'A GOOD SKILL CONTAINS', 22, CYAN, 'Arial', '700')]
for j,(head,body) in enumerate([('TRIGGER','when should it load?'),('INPUTS','what must already be known?'),('STEPS','what is the repeatable procedure?'),('PITFALLS','what commonly fails?'),('VERIFY','what evidence closes the loop?')]):
    y=455+j*72
    s += [text(990,y,head,21,PURPLE,'monospace','700'), text(1210,y,body,21,MUTED,'Arial')]
s += [rect(100, 735, 1720, 150, '#0e2231', '#2c6a76', 16, 2), text(135, 790, 'Use a skill instead of pasting the same rules into every session.', 25, WHITE, 'Arial', '700'), text(135, 840, 'It shapes the approach; it does not replace judgment or current-source verification.', 21, MUTED, 'Arial')]
scenes.append(s)

# 05: profiles
s = base(5, '04 / USE PROFILES AS SAFETY BOUNDARIES', 'A session is a conversation. A profile is an independent Hermes home.')
s += [terminal(100, 335, 760, 360, [('$ hermes profile create research', MUTED, 24), ('Created profile: research', GREEN, 25), ('research setup', MUTED, 24), ('research chat', MUTED, 24)])]
s += [rect(950, 335, 390, 460, '#12243b', CYAN, 18, 2), text(990, 395, 'main', 28, CYAN, 'monospace', '700')]
for j,t in enumerate(['config','environment','memory','skills','cron','state']): s += [text(990,455+j*48,'• '+t,22,WHITE,'monospace')]
s += [rect(1400, 335, 420, 460, '#241e36', PURPLE, 18, 2), text(1440, 395, 'research', 28, PURPLE, 'monospace', '700')]
for j,t in enumerate(['own config','own .env','own memory','own skills','own cron','own state']): s += [text(1440,455+j*48,'• '+t,22,WHITE,'monospace')]
s += [text(100, 875, 'Decide what belongs inside the profile before adding credentials or automation.', 24, AMBER, 'Arial', '700')]
scenes.append(s)

# 06: cron detailed
s = base(6, '05 / SCHEDULE A SAFE FIRST TASK', 'Start local. Show the complete command, then verify the artifact—not just the scheduler row.')
s += [terminal(100, 330, 1720, 335, [('$ hermes cron create "every weekday at 09:00"', MUTED, 23), ('  "Write a three-bullet research brief to', MUTED, 23), ('   C:/Users/you/hermes-output/research-brief.md"', MUTED, 23), ('Created job: research-brief', GREEN, 26)])]
s += [rect(100, 715, 510, 175, '#111e33', '#2b4669', 16, 2), text(135, 760, '1  LIST', 22, CYAN, 'monospace', '700'), text(135, 810, 'hermes cron list', 22, WHITE, 'monospace'), text(135, 850, 'confirm schedule + target', 19, MUTED, 'Arial')]
s += [rect(705, 715, 510, 175, '#111e33', '#2b4669', 16, 2), text(740, 760, '2  RUN', 22, CYAN, 'monospace', '700'), text(740, 810, 'hermes cron run <job_id>', 22, WHITE, 'monospace'), text(740, 850, 'trigger a controlled test', 19, MUTED, 'Arial')]
s += [rect(1310, 715, 510, 175, '#111e33', '#2b4669', 16, 2), text(1345, 760, '3  INSPECT', 22, CYAN, 'monospace', '700'), text(1345, 810, 'open research-brief.md', 22, WHITE, 'monospace'), text(1345, 850, 'verify the real artifact', 19, MUTED, 'Arial')]
scenes.append(s)

# 07: close
s = base(7, 'THE OPERATING RULE', 'Make the smallest real loop work, then add one layer at a time.')
s += [rect(100, 335, 820, 475, '#111e33', '#2b4669', 18, 2), text(145, 400, 'BUILD ORDER', 22, CYAN, 'Arial', '700')]
for j,t in enumerate(['chat before gateway','skill before copy-paste prompts','profile before mixing jobs','automation after verification']):
    y=475+j*75; s += [text(145,y,'[OK]',24,GREEN,'monospace','700'), text(250,y,t,27,WHITE,'Arial')]
s += [rect(1010, 335, 810, 475, '#0e2231', '#2c6a76', 18, 2), text(1055, 400, 'RELEASE CHECK', 22, CYAN, 'Arial', '700')]
for j,t in enumerate(['real response observed','command shown completely','local artifact inspected','secrets kept off-screen','repo + blog package included']):
    y=475+j*65; s += [text(1055,y,'✓',28,CYAN,'Arial','700'), text(1110,y,t,24,WHITE,'Arial')]
s += [rect(100, 875, 1720, 72, '#17233d', AMBER, 14, 2), text(960, 922, 'One layer at a time. Verify every layer.', 26, AMBER, 'Arial', '700', 'middle')]
scenes.append(s)

for i, body in enumerate(scenes, 1):
    svg = ''.join(body) + '</svg>'
    (OUT / f'scene-{i:02d}.svg').write_text(svg, encoding='utf-8')

print(f'Wrote {len(scenes)} detailed SVG scenes to {OUT}')
