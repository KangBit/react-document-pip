export type PIPMode = "clone" | "transfer" | "transfer-only";
export type PIPWindowSize = { width: number; height: number };

export type DocumentPIPProps = {
  children: React.ReactNode;
  isPipOpen: boolean;
  size?: Partial<PIPWindowSize>;
  mode?: PIPMode;
  copyAllStyles?: boolean;
  disallowReturnToOpener?: boolean; // '탭으로 돌아가기' 버튼 숨기기
  preferInitialWindowPlacement?: boolean; // 항상 초기 위치에 설정 크기로 열림 (Chrome 130+)
  onClose: () => void;
};
