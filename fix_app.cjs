const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace('import { Preloader } from "./components/Preloader";', 'import { Preloader } from "./components/Preloader";\nimport { PolicyModals } from "./components/PolicyModals";');
content = content.replace('const [loading, setLoading] = useState(true);', 'const [loading, setLoading] = useState(true);\n  const [activeModal, setActiveModal] = useState<\'privacy\' | \'terms\' | null>(null);');
content = content.replace('<Footer />', '<Footer onOpenPolicy={setActiveModal} />\n      <PolicyModals activeModal={activeModal} onClose={() => setActiveModal(null)} onOpen={setActiveModal} />');

fs.writeFileSync('src/App.tsx', content);
