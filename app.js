const iconMap = {
  arrow_outward: '↗', south: '↓', play_circle: '▷', north: '↑', arrow_forward: '→',
  hub: '⌘', warning: '!', verified: '✓', terminal: '>_', microbiology: '✦', science: '◌', monitoring: '▥',
  folder_managed: '▣', cloud_upload: '⇧', fact_check: '✓', account_tree: '⌁', query_stats: '⌁', schema: '◇',
  experiment: '⌬', database: '▤', auto_awesome: '✦', dashboard: '▦', shield_lock: '◆', check: '✓', close: '×',
  fingerprint: '◎', flag: '⚑'
};

function replaceIcons(scope = document) {
  scope.querySelectorAll('.material-symbols-outlined').forEach(node => {
    const token = node.textContent.trim();
    node.textContent = iconMap[token] || '•';
    node.setAttribute('aria-hidden', 'true');
  });
}

replaceIcons();

const workflowData = [
  { tag: 'STEP 01', icon: 'folder_managed', title: '创建项目与研究问题', text: '定义场地、污染物、菌剂、对照、采样时间和核心科学问题，让后续分析围绕同一研究设计展开。', input: '研究设计', output: '项目数据模型' },
  { tag: 'STEP 02', icon: 'cloud_upload', title: '接入多组学与环境数据', text: '上传原始序列、清洗后数据、代谢和酶活表、理化性质及重金属检测结果，并完成样本自动匹配。', input: '文件与检测表', output: '统一数据目录' },
  { tag: 'STEP 03', icon: 'fact_check', title: '自动检查数据质量', text: '检查文件完整性、测序质量、批次效应、缺失值、异常值和重复样本一致性，阻断不可靠输入。', input: '项目数据', output: '质控报告' },
  { tag: 'STEP 04', icon: 'account_tree', title: '执行可复现生信流程', text: '按批准的版本完成组装、分箱、MAG 评估、分类、丰度、功能注释和宏转录映射等任务。', input: '通过质控的数据', output: '标准化特征矩阵' },
  { tag: 'STEP 05', icon: 'query_stats', title: '开展多组学联合分析', text: '执行差异、时序、相关、网络、中介和结构方程分析，并自动记录统计假设与参数。', input: '多组学特征', output: '关联与效应结果' },
  { tag: 'STEP 06', icon: 'schema', title: '形成机制候选证据卡', text: '连接微生物、基因、通路、代谢物、环境变量和污染物变化，同时给出反例与不确定性。', input: '分析结果与文献', output: '候选机制清单' },
  { tag: 'STEP 07', icon: 'experiment', title: '验证、否证并沉淀', text: '记录培养、微宇宙或现场实验结果，更新证据等级，将经过审阅的结论沉淀到项目知识库。', input: '验证任务', output: '审定结论与报告' }
];

const architectureData = [
  { title: '应用层', text: '面向不同角色提供项目、流程、探索、机制、报告和系统管理界面。' },
  { title: 'AI 协作层', text: '负责理解问题、规划任务、受控调用工具、检索证据、解释结果和生成报告草稿。' },
  { title: '分析服务层', text: '提供宏基因组、宏转录组、多组学统计、可视化和机制证据评分服务。' },
  { title: '计算与工作流层', text: '通过容器、任务队列和工作流引擎连接本地集群、HPC 或云端计算资源。' },
  { title: '数据与治理层', text: '保存原始文件、元数据、版本、权限和完整数据谱系，是所有结果可追溯的基础。' }
];

const roadmapData = [
  {
    kicker: '首要目标',
    title: '证明一次完整研究可以在平台内复现',
    text: '选择一个数据较完整的场地和一种重点重金属，打通从数据导入到报告输出的完整路径。',
    items: ['项目与样本管理', '宏基因组标准流程', '理化与金属数据联动', 'AI 解释与报告草稿'],
    gate: '同一输入可稳定复现同一结果'
  },
  {
    kicker: '能力扩展',
    title: '让基因存在、功能活性和环境响应相互印证',
    text: '接入宏转录、代谢和酶活数据，增加时间滞后、中介分析与机制证据卡，并记录实验验证。',
    items: ['宏转录与 MAG 映射', '代谢和酶活整合', '时序与中介分析', '验证任务管理'],
    gate: '候选机制可转化为明确验证任务'
  },
  {
    kicker: '平台复用',
    title: '把单项目经验沉淀为多场地科研资产',
    text: '建设跨场地知识库、分析模板、污染物机制本体和资源治理，在数据成熟后引入专用模型。',
    items: ['跨场地知识检索', '可复用分析模板', '资源与权限治理', '专用排序或预测模型'],
    gate: '新项目可以复用既有数据模型与流程'
  }
];

const detail = document.querySelector('#workflowDetail');
document.querySelectorAll('.flow-step').forEach(button => {
  button.addEventListener('click', () => {
    const index = Number(button.dataset.step);
    const item = workflowData[index];
    document.querySelectorAll('.flow-step').forEach(node => node.classList.remove('active'));
    button.classList.add('active');
    detail.animate([{ opacity: .4, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'ease-out' });
    detail.innerHTML = `
      <p class="detail-tag">${item.tag}</p>
      <span class="material-symbols-outlined detail-icon">${item.icon}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <div class="detail-meta"><span><b>输入</b>${item.input}</span><span><b>输出</b>${item.output}</span></div>`;
    replaceIcons(detail);
  });
});

const architectureDetail = document.querySelector('#architectureDetail');
document.querySelectorAll('.layer-card').forEach(button => {
  button.addEventListener('click', () => {
    const item = architectureData[Number(button.dataset.layer)];
    document.querySelectorAll('.layer-card').forEach(node => node.classList.remove('active'));
    button.classList.add('active');
    architectureDetail.innerHTML = `<small>当前层级</small><h3>${item.title}</h3><p>${item.text}</p>`;
  });
});

const roadmapContent = document.querySelector('#roadmapContent');
document.querySelectorAll('.roadmap-tab').forEach(button => {
  button.addEventListener('click', () => {
    const item = roadmapData[Number(button.dataset.phase)];
    document.querySelectorAll('.roadmap-tab').forEach(node => node.classList.remove('active'));
    button.classList.add('active');
    roadmapContent.animate([{ opacity: .35 }, { opacity: 1 }], { duration: 280 });
    roadmapContent.innerHTML = `
      <div><p class="phase-kicker">${item.kicker}</p><h3>${item.title}</h3><p>${item.text}</p></div>
      <div class="phase-deliverables"><p>交付内容</p><ul>${item.items.map(value => `<li>${value}</li>`).join('')}</ul></div>
      <div class="phase-gate"><span class="material-symbols-outlined">flag</span><p><small>阶段门槛</small><b>${item.gate}</b></p></div>`;
    replaceIcons(roadmapContent);
  });
});

const dialog = document.querySelector('#principleDialog');
document.querySelector('#openPrinciple').addEventListener('click', () => dialog.showModal());
document.querySelector('#closePrinciple').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) dialog.close();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(node => observer.observe(node));
