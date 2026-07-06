function initNavigation() {
  const menuButton = document.querySelector('.hamburger-menu');
  const menuItems = document.querySelectorAll('.menu-item');

  if (!menuButton || menuItems.length === 0) {
    return;
  }

  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isExpanded));
    menuItems.forEach(item => item.classList.toggle('show', !isExpanded));
  });

  menuItems.forEach(item => {
    const link = item.querySelector('a');
    if (!link) {
      return;
    }
    link.addEventListener('click', () => {
      if (menuButton.getAttribute('aria-expanded') === 'true') {
        menuButton.setAttribute('aria-expanded', 'false');
        menuItems.forEach(menuItem => menuItem.classList.remove('show'));
      }
    });
  });
}

const dataEndpoints = {
  research: {
    url: 'data/research.json',
    targetId: 'research-content',
    render: renderResearch
  },
  news: {
    url: 'data/news.json',
    targetId: 'news-list',
    render: renderNews
  },
  presentations: {
    url: 'data/presentations.json',
    targetId: 'presentations-list',
    render: data => renderList('presentations-list', data)
  },
  talks: {
    url: 'data/talks.json',
    targetId: 'talks-list',
    render: data => renderList('talks-list', data)
  },
  grants: {
    url: 'data/grants.json',
    targetId: 'grants-list',
    render: data => renderList('grants-list', data)
  },
  rewards: {
    url: 'data/rewards.json',
    targetId: 'rewards-list',
    render: data => renderList('rewards-list', data)
  },
  career: {
    url: 'data/career.json',
    targetId: 'career-list',
    render: data => renderList('career-list', data)
  }
};

function renderResearch(data) {
  const container = document.getElementById('research-content');
  if (!container) {
    return;
  }

  if (!data?.paragraphs?.length) {
    container.textContent = 'Research overview coming soon.';
    return;
  }

  container.innerHTML = '';
  data.paragraphs.forEach(paragraph => {
    const p = document.createElement('p');
    p.textContent = paragraph.text;
    if (paragraph.lang) {
      p.setAttribute('lang', paragraph.lang);
    }
    container.appendChild(p);
  });
}

function renderNews(items) {
  const list = document.getElementById('news-list');
  if (!list) {
    return;
  }

  if (!Array.isArray(items) || items.length === 0) {
    list.innerHTML = '<li>No news yet.</li>';
    return;
  }

  list.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');

    const time = document.createElement('time');
    if (item.dateISO) {
      time.setAttribute('datetime', item.dateISO);
    }
    time.textContent = item.dateLabel || item.dateISO || '';

    const description = document.createElement('span');
    if (item.url) {
      const link = document.createElement('a');
      link.href = item.url;
      link.textContent = item.headline;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      description.appendChild(link);
      if (item.details) {
        description.append(' ' + item.details);
      }
    } else {
      description.textContent = item.headline;
    }

    li.append(time, description);
    list.appendChild(li);
  });
}

function renderList(elementId, items) {
  const list = document.getElementById(elementId);
  if (!list) {
    return;
  }

  if (!Array.isArray(items) || items.length === 0) {
    list.innerHTML = '<li>Information will be updated soon.</li>';
    return;
  }

  list.innerHTML = '';
  items.forEach(entry => {
    const item = document.createElement('li');
    item.textContent = entry;
    list.appendChild(item);
  });
}

async function loadData() {
  const loaders = Object.values(dataEndpoints).map(async ({ url, targetId, render }) => {
    try {
      // 対象要素がないページ (blogなど) では読み込まない
      if (targetId && !document.getElementById(targetId)) {
        return;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.status}`);
      }
      const data = await response.json();
      render(data);
    } catch (error) {
      console.error(error);
    }
  });

  await Promise.all(loaders);
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  loadData();
});
