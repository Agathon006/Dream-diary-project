const keyToKeep = 'theme';

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    
    if (key !== keyToKeep) {
        localStorage.removeItem(key);
    }
}