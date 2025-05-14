'use client';
import { useData } from '@/app/context/DataContext';
import { Command } from '@tauri-apps/plugin-shell';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import React from 'react';

function DockerVersionComponent() {
  const { dockerVersion, setDockerVersion } = useData();

  const fetchDockerVersion = async () => {
    try {
      const cmd = Command.create('docker', ['--version']);
      const result = await cmd.execute();
      setDockerVersion(result.stdout);
    } catch (e) {
      setDockerVersion('');
      console.error(e);
    }
  };

  console.log(dockerVersion)

  useEffect(() => {
    
      fetchDockerVersion();
  }, [dockerVersion]);

  return (
    <h1 className="text-[12px]" onClick={fetchDockerVersion}>
      {dockerVersion === '' ? <Loader2 className="animate-spin" /> : dockerVersion}
    </h1>
  );
}

export default React.memo(DockerVersionComponent); // ✅ single default export
