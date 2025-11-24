document.getElementById('confirmBtn').onclick = async () => {
  const code = document.getElementById('codeInput').value.trim();
  const resEl = document.getElementById('result');
  resEl.textContent = '確認中...';
  try {
    const res = await fetch(`https://script.google.com/macros/s/AKfycbzJf6ZSEzEubJE8zjDQwOaSHWPWdfUC_Ab5AmlyDIYrm9jKUD5iTRjyZF4XwIpmtW6M/exec?code=${code}`);
    const data = await res.json();
    resEl.textContent = data.status === 'ok' ? '正しいコードです！' : 'コードが違います';
  } catch(e){
    resEl.textContent = 'エラーが発生しました';
  }
};
