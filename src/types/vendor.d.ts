/**
 * Declaracoes minimas para pacotes cujos arquivos de tipos nao vieram na
 * restauracao manual de node_modules. Nao alteram comportamento em runtime.
 */
declare module 'lucide-react'

declare module 'firebase/storage' {
  export interface FirebaseStorage {
    app?: unknown
  }
  export function getStorage(app?: unknown): FirebaseStorage
  export function connectStorageEmulator(
    storage: FirebaseStorage,
    host: string,
    port: number,
  ): void
}
