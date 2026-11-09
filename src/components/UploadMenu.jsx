import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// ⚠️ 把这里换成你 Supabase 的 URL 和 anon key
const supabaseUrl = 'https://你的项目ID.supabase.co';
const supabaseKey = '你的_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function UploadMenu({ restaurant }) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      // 🛡️ 1. 限制大小 2MB 以内
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen es muy grande. Máximo 2MB.');
        return;
      }

      // 🛡️ 2. 限制只能传图片
      if (!file.type.startsWith('image/')) {
        alert('Solo se permiten imágenes (JPG, PNG, WebP).');
        return;
      }

      setUploading(true);

      // 生成唯一文件名
      const fileExt = file.name.split('.').pop();
      const fileName = `${restaurant.slug}-${Date.now()}.${fileExt}`;

      // 3. 上传到 Supabase 的 menus 存储桶
      const { data, error } = await supabase.storage
        .from('menus') 
        .upload(fileName, file);

      if (error) throw error;

      // 4. 获取公开链接
      const { data: urlData } = supabase.storage
        .from('menus')
        .getPublicUrl(fileName);

      setUploadedUrl(urlData.publicUrl);
      
    } catch (error) {
      alert('Error al subir la imagen: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-menu-box">
      <h3>¿Eres el dueño de este restaurante?</h3>
      <p>Sube nuevas fotos de tu menú (Máximo 2MB).</p>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        id={`upload-${restaurant.id}`}
        style={{ display: 'none' }}
      />
      
      <label 
        htmlFor={`upload-${restaurant.id}`} 
        className={`upload-btn ${uploading ? 'uploading' : ''}`}
      >
        {uploading ? 'Subiendo...' : '📸 Seleccionar Imagen'}
      </label>

      {uploadedUrl && (
        <div className="upload-success">
          <p>✅ ¡Imagen subida con éxito!</p>
          <a 
            href={`https://wa.me/50433514110?text=Hola, acabo de subir una nueva foto para el menú de ${restaurant.name}. Aquí está el enlace: ${uploadedUrl}`}
            target="_blank"
            rel="noreferrer"
            className="upload-whatsapp-btn"
          >
            📱 Avisar a HNMenu por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}