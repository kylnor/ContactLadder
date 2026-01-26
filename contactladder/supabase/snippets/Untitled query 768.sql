  -- Create storage bucket for module images                                                                                                                                                    
  INSERT INTO storage.buckets (id, name, public)                                                                                                                                                
  VALUES ('module-images', 'module-images', true)                                                                                                                                               
  ON CONFLICT (id) DO NOTHING;                                                                                                                                                                  
                                                                                                                                                                                                
  -- Allow public access to view images                                                                                                                                                         
  CREATE POLICY "Public Access"                                                                                                                                                                 
  ON storage.objects FOR SELECT                                                                                                                                                                 
  USING ( bucket_id = 'module-images' );                                                                                                                                                        
                                                                                                                                                                                                
  -- Allow admins to upload images                                                                                                                                                              
  CREATE POLICY "Admins can upload images"                                                                                                                                                      
  ON storage.objects FOR INSERT                                                                                                                                                                 
  WITH CHECK (                                                                                                                                                                                  
    bucket_id = 'module-images' AND                                                                                                                                                             
    EXISTS (                                                                                                                                                                                    
      SELECT 1 FROM profiles                                                                                                                                                                    
      WHERE profiles.id = auth.uid()                                                                                                                                                            
      AND profiles.is_admin = true                                                                                                                                                              
    )                                                                                                                                                                                           
  );                                                                                                                                                                                            
                                                                                                                                                                                                
  -- Allow admins to delete images                                                                                                                                                              
  CREATE POLICY "Admins can delete images"                                                                                                                                                      
  ON storage.objects FOR DELETE                                                                                                                                                                 
  USING (                                                                                                                                                                                       
    bucket_id = 'module-images' AND                                                                                                                                                             
    EXISTS (                                                                                                                                                                                    
      SELECT 1 FROM profiles                                                                                                                                                                    
      WHERE profiles.id = auth.uid()                                                                                                                                                            
      AND profiles.is_admin = true                                                                                                                                                              
    )                                                                                                                                                                                           
  );              
