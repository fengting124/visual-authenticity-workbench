import { Upload, FileImage, FileVideo } from 'lucide-react';

type SampleImportPanelProps = {
  onImport: () => void;
  imported: boolean;
};

export function SampleImportPanel({ onImport, imported }: SampleImportPanelProps) {
  return (
    <div className="grid grid-cols-[1fr_280px] gap-4">
      <div className="rounded-md border border-dashed border-forensic-gold/[0.08] bg-black/20 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-forensic-gold/40 bg-forensic-gold/10 text-forensic-gold">
            <Upload className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold">样本导入入口</p>
            <p className="mt-2 text-sm leading-6 text-forensic-stone">
              输入包括图像或视频文件、样本来源、生成器信息、备注说明。导入后建立样本任务，并进入自动证据标注流程。
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-3">
            <FileImage className="mb-2 h-4 w-4 text-forensic-gold" />
            <p className="text-xs text-forensic-stone">图像输入</p>
            <p className="mt-1 text-sm">PNG / JPG 占位样本</p>
          </div>
          <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-3">
            <FileVideo className="mb-2 h-4 w-4 text-forensic-olive" />
            <p className="text-xs text-forensic-stone">视频输入</p>
            <p className="mt-1 text-sm">MP4 占位样本</p>
          </div>
        </div>
      </div>
      <div className="rounded-md border border-forensic-gold/[0.08] bg-graphite-850 p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-forensic-stone">导入输出</p>
        <p className="mt-3 text-sm leading-6">
          {imported
            ? '已生成样本编号 IMP-DEMO-001，状态为等待自动标注。'
            : '等待导入样本。'}
        </p>
        <button
          type="button"
          onClick={onImport}
          className="mt-4 w-full rounded-md border border-forensic-gold/40 bg-forensic-gold/10 px-4 py-2 text-sm font-medium text-forensic-gold"
        >
          导入样本
        </button>
      </div>
    </div>
  );
}
